# String Matching Algorithm Visualizer

An interactive, web-based visualization and benchmarking tool designed to compare the performance and execution of fundamental string matching algorithms. Built for educational purposes, this tool allows users to input custom text or generate massive sample datasets to observe how different algorithms handle search operations in real-time.

## 🚀 Features

* **Interactive Benchmarking:** Manually input text and patterns, or use the **Random Sample Data** generator to test algorithms against massive strings.
* **Algorithm Implementations:** Features custom-built logic for:
  * Naïve String Matching
  * Knuth-Morris-Pratt (KMP)
  * Rabin-Karp (Rolling Hash)
* **Comprehensive Metrics:** Tracks and displays the exact match indices, total comparisons made, and theoretical time complexities (Best/Worst cases).
* **Adaptive Time Formatting:** Accurately measures execution time using `performance.now()`. Automatically scales to scientific notation or microseconds (µs) for operations taking `< 0.001 ms` to prevent `0.000 ms` readouts.
* **Visual Comparisons:** Includes a "Run All" feature that generates side-by-side Bar Charts comparing the total comparisons and actual time taken across all three algorithms.
* **Modern UI/UX:** Fully responsive design featuring a Dark/Light mode toggle and a clean, academic aesthetic.

## 🛠️ Tech Stack

* **Frontend Framework:** [React](https://reactjs.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Data Visualization:** [Recharts](https://recharts.org/)
