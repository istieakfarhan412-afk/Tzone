# Security Specification for Tzone BD

## Data Invariants
1. **User Profiles**: Every user must have a unique profile at `/users/{uid}`. Users can only edit their own profile. Only admins can see all user data if needed (though PII should be protected).
2. **Products**: Anyone can read products. Only admins can create, update, or delete products.
3. **Orders**: Users can only see their own orders. Users can create orders (pending state). Admins can update order status.
4. **Reviews**: Users can only create one review per product. Reviews must be linked to a valid product and user. Users can edit/delete their own reviews.
5. **Cart/Wishlist**: Private to the user.

## The "Dirty Dozen" Payloads (Red Team Test Cases)
1. **Identity Spoofing**: Attempt to create a user profile with a different UID than the authenticated user.
2. **Privilege Escalation**: Attempt to set `role: 'admin'` on a user profile during creation or update.
3. **Ghost Product**: Attempt to create a product as a non-admin user.
4. **Price Manipulation**: Attempt to update a product's price as a regular user.
5. **Order Hijacking**: Attempt to read another user's order.
6. **Status Forgery**: Attempt to change an order status from `pending` to `delivered` as a regular user.
7. **Review Bombing**: Attempt to create a review with a 1MB comment string.
8. **Invalid ID Poisoning**: Attempt to use `../` or junk characters as a product ID.
9. **Timestamp Spoofing**: Attempt to set `createdAt` to a future date instead of `serverTimestamp()`.
10. **Cart Theft**: Attempt to read another user's cart items.
11. **Shadow Field**: Attempt to add a `verified: true` field to a user profile that isn't in the schema.
12. **Recursive Cost Attack**: Attempt to query all orders without a `userId` filter.

## Test Runner (Conceptual)
Tests will verify that all "Dirty Dozen" payloads return `PERMISSION_DENIED`.
