Hotel Booking Workflow Implementation Plan
This plan outlines the steps to implement a booking workflow similar to Holiday Inn for a single hotel.

User Review Required
IMPORTANT

Database Schema: I am assuming a reservas (bookings) table exists or can be created in Supabase. I will need to know the schema or permission to create it. Dependencies: I plan to use standard React state for forms to avoid adding new dependencies like react-hook-form or zod unless requested. Payment: Real payment processing is out of scope for this task; I will implement a UI-only mock payment step.

Proposed Changes
Components [NEW]
[NEW] 
BookingSearch
A search bar component containing:
Date pickers for Check-in and Check-out.
Guest count input.
"Search" button that redirects to the rooms page with query parameters.
[NEW] 
BookingWorkflow
A multi-step component for the booking process:
Step 1: Extras (Optional, can be skipped for MVP).
Step 2: Guest Details (Name, Email, Phone).
Step 3: Payment (Mock credit card form).
Step 4: Confirmation (Summary and "Book" action).
Pages [MODIFY/NEW]
[MODIFY] 
apps/web/app/habitaciones/page.tsx
Integrate BookingSearch at the top.
Filter rooms based on availability (if backend supports it) or just pass dates to the next step.
Update "Book Now" buttons to link to the reservation page with room ID and selected dates.
[NEW] 
apps/web/app/reservar/page.tsx
A new page to handle the booking steps.
Will retrieve room details based on query param roomId.
Will host the BookingWorkflow component.
Utils [NEW]
[NEW] 
apps/web/utils/booking.ts
Helper functions to calculate number of nights, total price, etc.
Supabase function calls to insert the reservation.
Verification Plan
Automated Tests
None currently applicable as there's no testing setup revealed.
Manual Verification
Search:
Go to /habitaciones.
Select dates (e.g., Feb 26 - Feb 28).
Click "Search".
Verify URL updates with query params.
Room Selection:
Click "Book Now" on a room.
Verify navigation to /reservar?roomId=...&checkIn=....
Verify room details are shown correctly.
Booking Process:
Fill in guest details.
Fill in mock payment details.
Click "Confirm Booking".
Verify: Check Supabase dashboard (if accessible) or console logs to ensure data is sent.
Verify success message is shown.

-----------------------
tasklist:

Hotel Booking Workflow Implementation
 Explore existing project structure and database schema
 Create Implementation Plan
 Implement Search/Availability Component
 Implement Room Listing and Selection
 Implement Booking/Checkout Form
 Implement Payment Integration (UI only for now or mock)
 Verify Booking Flow
