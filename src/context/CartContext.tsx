import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: any) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (!user) {
      setItems([]);
      return;
    }

    const q = query(collection(db, 'users', user.uid, 'cart'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const cartItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CartItem));
      setItems(cartItems);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, `users/${user.uid}/cart`);
    });

    return () => unsubscribe();
  }, [user]);

  const addItem = async (product: any) => {
    if (!user) return;
    const existingItem = items.find(item => item.productId === product.id);
    if (existingItem) {
      await updateQuantity(existingItem.id, existingItem.quantity + 1);
    } else {
      const path = `users/${user.uid}/cart`;
      try {
        await addDoc(collection(db, path), {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.images?.[0] || '',
          quantity: 1,
          updatedAt: serverTimestamp()
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, path);
      }
    }
  };

  const removeItem = async (itemId: string) => {
    if (!user) return;
    const path = `users/${user.uid}/cart/${itemId}`;
    try {
      await deleteDoc(doc(db, path));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (!user || quantity < 1) return;
    const path = `users/${user.uid}/cart/${itemId}`;
    try {
      await updateDoc(doc(db, path), {
        quantity,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
