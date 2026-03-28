# **MedVault PRD**

## **Project Overview**

Develop an online medicine e-commerce platform where customers can browse and purchase over-the-counter (OTC) medicines, sellers can manage their inventory and fulfill orders, and admins oversee the entire platform. The portal prioritizes secure transactions, inventory management, and user experience with role-based access control.

* * *

## **Functional Requirements**

### **User Roles**

*   **Customers**:
    *   Register and log in to the portal.
    *   Browse medicines by category, manufacturer, or price range.
    *   Add medicines to cart and manage cart items.
    *   Place orders with shipping address details.
    *   Track order status (Placed, Processing, Shipped, Delivered, Cancelled).
    *   Leave reviews and ratings for medicines after delivery.
    *   View order history and reorder medicines.
    *   Manage personal profile and addresses.

*   **Sellers**:
    *   Register and log in as a seller.
    *   Add, edit, and delete their own medicine listings.
    *   Categorize medicines using predefined categories.
    *   Manage stock levels and inventory.
    *   View incoming orders for their medicines.
    *   Update order status (Processing, Shipped, Delivered).
    *   View sales analytics and reports.

*   **Admin**:
    *   Full control over all users, medicines, and orders.
    *   **User Management:**
        *   View all customer and seller accounts.
        *   Ban/unban users.
        *   Manage user roles and permissions.
    *   **Medicine Management:**
        *   View, edit, or remove any medicine listing.
        *   Approve/reject new medicine listings from sellers.
        *   Manage medicine categories.
    *   **Order Management:**
        *   View all orders across the platform.
        *   Monitor order status and resolve disputes.
    *   Delete inappropriate reviews.

### **Features**

*   **Authentication**:
    *   User signup/login using email and password.
    *   Role selection during registration (Customer/Seller).
    *   Password hashing for security.
    *   JWT-based authentication for session management.
    *   Form validation and loading states for better user experience and secure data handling.
      
  **You may use tools like Passport.js, BetterAuth, or clustering techniques to manage authentication and scalability.**

*   **Medicine Management (Sellers Only):**
    *   Sellers can create medicine listings with:
        *   Name, description, category, manufacturer, price, stock quantity, and images.
    *   **Draft mode**: Sellers can save medicine listings as drafts without publishing.
    *   **Submit for approval**: Move medicine from "Draft" to "Pending Review".
    *   **Admin action**:
        *   **Under Review→** When sellers submit medicines, initial status will be under review.
        *   **Approve** → Medicine becomes publicly visible in the shop.
        *   **Reject** → Medicine returns to seller with feedback.
    *   Sellers can edit/delete their medicines **only if unpublished or out of stock**.

*   **Admin Medicine Oversight**:
    *   View all medicines with statuses: **Under Review**, **Approved**, **Rejected**.
    *   Reject medicines with a feedback reason (Feedback visible only to the submitter).
    *   Manage medicine categories (Energy supplements, Pain relief, First aid, etc.).

*   **Category System**:
    *   Predefined categories by admins (Pain Relief, Vitamins, First Aid, Cold & Flu, etc.).
    *   Sellers must select a category when adding medicines.
    *   Customers can filter medicines by category.

*   **Shopping Cart and Checkout**:
    *   Customers can add/remove medicines from cart.
    *   View cart summary with total price.
    *   Proceed to checkout with shipping address.
    *   Payment on delivery (Cash on Delivery).

*   **Order Management**:
    *   Customers can place orders and track status.
    *   Order statuses: _Placed_, _Processing_, _Shipped_, _Delivered_, _Cancelled_.
    *   Sellers receive orders and update status.
    *   Customers can cancel orders before processing.
    *   Email notifications for order updates (optional).

*   **Reviews and Ratings (Only for Delivered Orders)**:
    *   Customers can rate medicines (1-10 scale) and write reviews.
    *   Reviews appear on medicine detail pages.
    *   Customers can edit/delete their own reviews.
    *   Admins can delete inappropriate reviews.

*   **Search and Filter**:
    *   Customers can search medicines by name, category, or manufacturer.
    *   Filter by price range, category, or rating.
    *   Sort by price (low to high, high to low), rating, or newest.

*   **Responsive Design**:
    *   The portal must be fully responsive and accessible on desktop and mobile devices.

* * *

## **Pages**

**Logo:** Prominently display the MediStore logo. 

**Navigation Bar:**

*   Home
*   **Shop:** All Available Medicines
*   Dashboard (Will redirect to a specific user dashboard based on their role)
*   About Us
*   Contact
*   Login/Register (if the user is not logged in)
*   My Profile (if logged in)
*   Cart (icon with item count for logged-in customers)
*   You can add other nav options if necessary

## **Home Page**

**Hero Banner:** Cover image with catchy statement about trusted medicine delivery.

**Search Option:** Allow customers to search for medicines by:

*   Name
*   Category
*   Manufacturer

**Featured Medicine Cards:** Each card should display:

*   Medicine image
*   Name
*   Category
*   Price
*   Rating (if available)
*   Stock status
*   "Add to Cart" or "View Details" button

**Categories Section:** Display popular categories with icons.

**Testimonials:** Customer reviews and ratings for top medicines.

**Newsletter:** A subscription section where users can enter their email to receive updates about new medicines, special offers, and health tips.

## **Footer**

*   **Contact Information:** Email, phone, and social media links.
*   **Copyright:** Standard copyright details.
*   **Additional Links:** Terms of Use, Privacy Policy, Shipping Policy, Return Policy.

* * *

## All Medicines Page (Paginated Grid/Card Layout)

**Purpose:**  
Lists all approved medicines in a clean, sortable, and filterable layout.

### **Layout & Features:**

- **Grid/Card Layout:** Each medicine displayed as a card containing:
  - Medicine name
  - Category
  - Manufacturer
  - Price
  - Representative image
  - Stock status (In Stock / Out of Stock)
  - Rating and review count
  - "Add to Cart" or "View Details" button

- **Pagination:**
  - Display 12–16 medicines per page
  - Navigate between pages with Next/Previous buttons or page numbers

- **Sorting Options:**
  - **Price:** Low to High / High to Low
  - **Rating:** Highest rated first
  - **Newest:** Recently added medicines

- **Filter Options:**
  - **Category:** Pain Relief, Vitamins, First Aid, etc.
  - **Price Range:** Custom slider or preset ranges
  - **Manufacturer:** Filter by brand
  - **Rating:** Minimum rating filter (e.g., 4+ stars)
  - **Stock Status:** In Stock / Out of Stock

- **Search Bar:**
  - Search medicines by name, category, or manufacturer

---

## Medicine Details Page

**Purpose:**  
Show complete information about a specific medicine and allow purchase interaction.

### **Layout & Features:**

- **Header Section:**
  - Medicine name
  - Category badge
  - Manufacturer
  - Price
  - Stock status
  - Rating and review count

- **Main Content:**
  - Medicine image gallery
  - Detailed description
  - Uses and benefits
  - Dosage information (if applicable)
  - Side effects and warnings
  - Ingredients list

- **Interactive Section:**
  - **Add to Cart:** Quantity selector and "Add to Cart" button
  - **Buy Now:** Direct checkout option
  - **Add to Wishlist** (optional)
  - **Share Medicine:** Social share buttons (optional)

- **Seller Information:**
  - Seller name
  - Seller rating
  - Link to seller's other medicines

- **Reviews Section:**
  - Display customer reviews with ratings
  - Sort by most recent or highest rated
  - "Write a Review" button (for customers who purchased)

- **Admin/Seller Actions (Visible only to authorized users):**
  - Edit medicine details (seller/admin)
  - Delete medicine (seller/admin)
  - Update stock (seller/admin)

- **Related Medicines:**
  - Show similar medicines in the same category

---

## **Cart Page**

**Purpose:**  
Display selected medicines and allow checkout.

### **Layout & Features:**

- **Cart Items List:**
  - Medicine name, image, price
  - Quantity selector (increase/decrease)
  - Remove item button
  - Subtotal per item

- **Cart Summary:**
  - Total items
  - Subtotal
  - Estimated shipping (if applicable)
  - Grand total

- **Action Buttons:**
  - "Continue Shopping"
  - "Proceed to Checkout"

---

## **Checkout Page**

**Purpose:**  
Collect shipping details and finalize order.

### **Layout & Features:**

- **Shipping Address Form:**
  - Full name
  - Phone number
  - Street address
  - City, State, ZIP code
  - Delivery instructions (optional)

- **Order Summary:**
  - List of items with quantities and prices
  - Total amount

- **Payment Method:**
  - Cash on Delivery (COD)
  - (Optional: Online payment integration)

- **Action Buttons:**
  - "Place Order"
  - "Back to Cart"

---

## **Dashboard**

*   **Admin Dashboard:**
    *   Full control over user accounts, medicine listings, and orders.
    *   **User Management:**
        *   View all customer and seller accounts.
        *   Ban/unban users.
        *   Manage user roles.
    *   **Medicine Management:**
        *   View, edit, or remove any medicine listing.
        *   View all medicines with: **Under Review,** **Approved**, **Rejected**.
        *   Reject medicines with a feedback reason (Feedback visible only to the submitter).
        *   Manage medicine categories.
    *   **Order Management:**
        *   View all orders with statuses.
        *   Monitor sales analytics.
        *   Resolve customer disputes.

*   **Seller Dashboard:**
    *   Sellers can create medicine listings with:
        *   Name, description, category, manufacturer, price, stock quantity, and images.
    *   **Draft mode**: Sellers write and save medicine listings without publishing.
    *   **Submit for approval**: Move medicine from "Draft" to "Pending Review".
    *   **Admin action**:
        *   **Under Review→** When sellers submit medicines, initial status will be under review.
        *   **Approve** → Medicine becomes publicly visible.
        *   **Reject** → Medicine returns to seller with feedback.
    *   Sellers can edit/delete their medicines **only if unpublished**.
    *   **Order Management:**
        *   View incoming orders for their medicines.
        *   Update order status (Processing, Shipped, Delivered).
        *   View sales reports and analytics.

*   **Customer Dashboard:**
    *   **Order History:**
        *   View all past and current orders.
        *   Track order status in real-time.
        *   Reorder previous purchases.
    *   **Reviews:**
        *   View and manage written reviews.
        *   Edit or delete reviews.
    *   **Profile Settings:**
        *   Update personal information.
        *   Manage saved addresses.
        *   Change password.
    *   **Wishlist** (optional):
        *   Save medicines for later purchase.

* * *

## Error Handling

The system must handle errors properly to ensure reliability and a smooth user experience.

### Validation
- Required field validation
- Email format validation
- Price and quantity validation
- Stock availability check

### Loading States
Loading indicators must be used during asynchronous operations.

- API request loading state
- Order processing loading state
- Payment processing loading state (if online payment)

### Error Messages
Clear and meaningful error messages should be displayed when issues occur.

- Invalid login credentials
- Out of stock notification
- Order placement failure
- Unauthorized access warning
- Payment failure notification (if applicable)

---

## UI/UX Quality

The application must maintain a high standard of usability and interface design.

### Requirements

- Fully responsive design
- Support for mobile, tablet, and desktop devices
- Consistent styling using Tailwind CSS
- Clean and organized layout
- Reusable UI components
- Intuitive navigation
- Clear call-to-action buttons
- Accessible design (WCAG guidelines)

---

## Commit History Requirement

The project must include a proper commit history demonstrating development progress.

- Minimum **20 meaningful commits** for the **client repository**
- Minimum **20 meaningful commits** for the **server repository**

Each commit message should clearly describe the implemented feature, fix, or improvement.

---

## Video Explanation

A project demonstration video must be provided.

**Video Length:** 5–10 minutes

### The video should demonstrate the following features:

| Step | Feature | Description |
|-----|--------|-------------|
| 1 | User Registration | Creating a new customer and seller account |
| 2 | User Login | Authenticating registered users |
| 3 | Browse Medicines | Viewing available medicines with filters |
| 4 | Add to Cart | Adding medicines to shopping cart |
| 5 | Place Order | Completing checkout with shipping details |
| 6 | Track Order | Viewing order status |
| 7 | Seller Add Medicine | Creating a new medicine listing |
| 8 | Admin Approve Medicine | Admin reviewing and approving medicine |
| 9 | Review System | Customer rating and reviewing medicines |
| 10 | Dashboard Features | Customer/Seller/Admin dashboard overview |
| 11 | Admin Moderation | Admin managing users and orders |

### **Non-Functional Requirements:**

*   **Usability:** Clean, intuitive UI/UX for customers, sellers, and admins.
*   **Security:** Secure password storage, JWT authentication, and input validation.
*   **Performance:** Fast loading times and optimized database queries.
*   **Maintainability:** Modular, clean, and well-documented code following RESTful API design principles.

* * *

**Important Note:**

This document provides a high-level overview of the core features and pages for the MediStore Website. Add more pages (e.g., About Us, Contact, FAQ, Shipping Policy, Return Policy, User Profile). Think creatively and make the project your own — the more professional and complete your project looks, the better it will be for your portfolio and CV.

### **Technology Stack:**

*   **Frontend:**
    *   **Next.js** (for server-side rendering and static site generation).
    *   **Tailwind CSS** (for utility-first styling).
*   **Backend:**
    *   **Node.js** with **Express.js** (for RESTful API).
    *   **Prisma** (for database management).
*   **Database:**
    *   **PostgreSQL** (for relational data storage).
*   **Authentication:**
    *   **JWT** (for session management). (Passport.js, BetterAuth, or clustering)
*   **Payment Integration (Optional):**
    *   **SSLCommerz** or **Stripe** (for online payments).
*   **Deployment:**
    *   Vercel, Render, Railway for hosting and deployment.

