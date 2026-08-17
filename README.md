# CSI Wheel of Fortune

Create a Progressive Elimination Spin-the-Wheel Game

Build a fully functional, polished Spin the Wheel web application for the CSI Student Branch at K. K. Wagh Institute of Engineering Education & Research, Nashik, A.Y. 2025–26.

CORE REQUIREMENT — PROGRESSIVE ELIMINATION

The most important functionality is:

All participants start on the wheel → Spin → One participant is selected → Selected participant is removed → Spin again → Repeat until everyone is selected.

This must work as a continuous elimination system.

PARTICIPANTS

Use exactly these 26 names:

Ankit Kishorkumar Khandelwal

Manasi Umesh Jadhav

Shweta Sanjay Yeola

Meghraj Nilesh Bhavsar

Atharva Tushar Jadhav

Sadique Peersahab Khatib

Akshada Satish Kale

Palak Manilkumar Lokwani

Deepali Sunil Patil

Vaibhav Narayan Patil

Shantanu Prashant Patil

Prasad Sopan Borade

Dhruvesh Kashinath Patil

Sarthak Deepak Pawar

Yash Subhash Gatkal

Hetavi Ramesh Rampariya

Ayush Sudhir Lad

Bhavesh Dipak Kale

Sanket Milind Chaudhari

Rutuja Hitendra Nagare

Piyush Satish Sanap

Omkar Sharad More

Sakshi Malhari Malunjkar

Deodatta Abhyuday Pagar

Sanchita Santosh Rajurkar

Sneha Bhanudas Nikam

Do not modify, abbreviate, duplicate, or omit any name.

HOW THE WHEEL MUST WORK

Initial State

When the application loads:

Display all 26 names around the wheel.

Every name must have its own segment.

All 26 names must be selectable.

Display:

26 MEMBERS REMAINING

First Spin

When the user clicks SPIN:

Randomly select exactly ONE name from the 26 available names.

Spin the visual wheel several times.

Gradually slow the wheel down.

Stop with the selected person's segment exactly under the pointer.

Display a winner announcement:

🎉 SELECTED MEMBER 🎉

[Selected Name]

Do NOT immediately remove the person while the wheel is spinning.

After the result is displayed, show a button:

NEXT SPIN →

After Clicking NEXT SPIN

When the user clicks NEXT SPIN:

Remove the previously selected person from the active participant list.

Rebuild/update the wheel using only the remaining participants.

The selected person's segment must completely disappear.

Update the counter.

For example:

26 → select Ankit → 25 remaining

Then:

25 → select Manasi → 24 remaining

Then:

24 → select Shweta → 23 remaining

Continue this process.

VERY IMPORTANT

The selected person must NOT remain on the wheel after proceeding to the next spin.

The wheel should progressively shrink:

26 → 25 → 24 → 23 → 22 → ... → 3 → 2 → 1 → 0

Every selected person is permanently eliminated from the current session.

WHEEL REDRAWING

After each elimination:

Recalculate the wheel segments.

Redistribute the remaining names evenly around the wheel.

Keep the wheel visually centered.

Ensure names remain readable.

Do not leave an empty segment where the removed person was.

Do not keep eliminated names hidden but technically selectable.

The active participant array must contain ONLY people who have not yet been selected.

RANDOMNESS

Every available participant must have an equal probability of being selected.

Use a proper random selection mechanism.

The visual animation must correspond to the randomly selected participant.

Do NOT simply animate the wheel randomly and then choose a different winner afterward.

The selected segment and displayed winner must always match.

FINAL PARTICIPANT

When only one person remains:

Display that person as the final remaining participant.

Allow the final spin.

Select that person.

After selection, display:

🏆 ALL MEMBERS SELECTED! 🏆

The CSI Committee selection is complete.

Show:

26 / 26 Selected

SELECTION HISTORY

Add a panel beside or below the wheel called:

SELECTION HISTORY

After every spin, add the selected person to the history.

Example:

#1 — Ankit Kishorkumar Khandelwal
#2 — Manasi Umesh Jadhav
#3 — Shweta Sanjay Yeola

The history should show the order in which people were selected.

COUNTER

Always display the current state clearly:

MEMBERS REMAINING: 26 / 26

After first selection:

MEMBERS REMAINING: 25 / 26

After second selection:

MEMBERS REMAINING: 24 / 26

Continue until:

MEMBERS REMAINING: 0 / 26

Also display:

SELECTED: X / 26

BUTTON STATES

Before spinning:

🎡 SPIN THE WHEEL

While spinning:

SPINNING...

After a winner is selected:

NEXT SPIN →

Do not allow the user to start another spin while the current animation is running.

RESET

Include a:

↻ RESET WHEEL

button.

When clicked, show a confirmation:

Reset the wheel and restore all 26 members?

If confirmed:

Restore all 26 names.

Clear selection history.

Reset counter to 26/26.

Reset the wheel.

Allow the selection process to begin again.

WINNER ANIMATION

When a person is selected:

Stop the wheel dramatically.

Highlight the selected segment.

Show a winner card/modal.

Display the full name prominently.

Add confetti or particles.

Use a short celebratory animation.

Make the result highly visible for an event audience.

Example:

🎉 SELECTED! 🎉

Ankit Kishorkumar Khandelwal

Then show:

NEXT SPIN →

VISUAL DESIGN

Create a premium technology/event aesthetic.

Header:

COMPUTER SOCIETY OF INDIA

CSI STUDENT BRANCH
K. K. Wagh Institute of Engineering Education & Research, Nashik

A.Y. 2025–26

Main heading:

🎡 CSI COMMITTEE SPIN THE WHEEL

Subtitle:

Spin • Select • Eliminate • Repeat

Use:

Large central wheel

Vibrant alternating segment colors

Clear pointer at the top

Large readable names

Modern typography

Subtle technology/circuit background

Smooth animations

Professional college-event appearance

Responsive layout

RESPONSIVE DESIGN

The application must work properly on:

Desktop

Laptop

Tablet

Mobile

On mobile, stack the selection history below the wheel.

DATA LOGIC

Maintain two separate arrays/states:

allParticipants

Contains all original 26 names.

remainingParticipants

Contains only names who have not yet been selected.

When a participant is selected:

Add them to selection history.

Remove them from remainingParticipants.

Keep them permanently removed for the current session.

Redraw the wheel using remainingParticipants.

Never randomly select from allParticipants after the first elimination.

CRITICAL ACCEPTANCE TEST

The application must pass this exact test:

Start: 26 names visible.

Spin 1: One name selected → winner displayed.

Next Spin: Winner disappears → 25 names visible.

Spin 2: One of the remaining 25 names selected.

Next Spin: Second winner disappears → 24 names visible.

Continue until:

1 name visible → final spin → 0 names remaining.

At no point should an already-selected person appear on the wheel again.

FINAL QUALITY REQUIREMENT

This should feel like a real live-event selection system, not a static demonstration.

Prioritize:

Correct progressive elimination

True random selection

Exact correspondence between animation and winner

No duplicate selections

All 26 names initially visible

Selected names disappearing after each round

Clear selection history

Smooth animations

Excellent readability

Professional CSI event presentation

Do not use placeholder data or dummy names.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://wheel-of-elimination.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3c7be6b6-efa2-4b18-a5e9-9b4d0d49e4d1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
