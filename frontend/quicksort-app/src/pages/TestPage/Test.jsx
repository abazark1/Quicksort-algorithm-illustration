import React, { useState } from "react";
import "./Modal.css";
import Quiz from "./Quiz";
import Problems from "./Problems";

const Test = () => {
  const questions = [
    {
      question: "Quicksort uses ...",
      options: ["Exchanging", "Partitioning", "Selection", "Merging"],
      answer: "Partitioning",
    },
    {
      question: "Using quicksort for arrays is a stable way of sorting",
      options: ["True", "False"],
      answer: "False",
    },
    {
      question:
        "Which of the following algorithm design technique is used in designing quicksort algorithm?",
      options: [
        "Dynamic programming",
        "Back tracking",
        "Divide and conquer",
        "Greedy",
      ],
      answer: "Divide and conquer",
    },
    {
      question: "What is the worst case time complexitiy for quicksort?",
      options: ["Θ(2^n)", "Θ(n^2)", "Θ(log n)", "Θ(n*n)"],
      answer: "Θ(n^2)",
    },
    {
      question: "What is the best case time complexitiy for quicksort?",
      options: ["Θ(n*log n)", "Θ(n)", "Θ(log n)", "Θ(n*n)"],
      answer: "Θ(n*log n)",
    },
    {
      question:
        "Partition a list A[] into two non-empty parts. The values in the left part should be?",
      options: ["A[] <= pivot", "A[] > pivot", "A[] >= pivot", "A[] < pivot"],
      answer: "A[] <= pivot",
    },
    {
      question:
        "Which of the following methods is the most effective for picking the pivot element?",
      options: [
        "first element",
        "last element",
        "median-of-three partitioning",
        "random",
      ],
      answer: "median-of-three partitioning",
    },
    {
      question: "Quicksort uses join operation rather than merge operation?",
      options: ["true", "false"],
      answer: "true",
    },
    {
      question:
        "How many sub-ranges does the quicksort algorithm divide the entire range into?",
      options: ["one", "two", "three", "four"],
      answer: "two",
    },
    {
      question:
        "Which of the following sorting algorithms is used along with quicksort to sort the sub-arrays?",
      options: ["Merge sort", "Bubble sort", "Insertion sort", "Heap sort"],
      answer: "Insertion sort",
    },
    {
      question:
        "Which common operations are used in quicksort for linked lists?",
      options: [
        "Swap and unlink",
        "Unlink and precede",
        "Remove and compare",
        "Add and swap",
      ],
      answer: "Unlink and precede",
    },
    {
      question:
        "Suppose we are sorting an array using quicksort, and we have just finished the first partitioning with the array looking like this: 2  1  7  9  12  10. Which statement is correct?",
      options: [
        "The pivot should be either 7 or 9",
        "The pivot could be 7, but it is not 9",
        "The pivot is not 7, but it could be 9",
        "Neither 7, nor 9 is the pivot",
      ],
      answer: "The pivot should be either 7 or 9",
    },
  ];

  const [problems, setProblems] = useState([
    {
      name: "Quicksort - Partition",
      difficulty: "Easy",
      successRate: "96%",
      link: "https://www.hackerrank.com/challenges/quicksort1/problem?isFullScreen=true",
    },
    {
      name: "Quicksort - Sorting",
      difficulty: "Easy",
      successRate: "91%",
      link: "https://www.hackerrank.com/challenges/quicksort2/problem",
    },
    {
      name: "Cricket tournament",
      difficulty: "Easy",
      successRate: "66%",
      link: "https://www.hackerearth.com/practice/algorithms/sorting/quick-sort/practice-problems/algorithm/chef-and-chefa-a5c8800a/",
    },
    {
      name: "Eating apples",
      difficulty: "Easy",
      successRate: "85%",
      link: "https://www.hackerearth.com/practice/algorithms/sorting/quick-sort/practice-problems/algorithm/snake-b0112afa/",
    },
    {
      name: "Specialty of a sequence",
      difficulty: "Easy",
      successRate: "85%",
      link: "https://www.hackerearth.com/practice/algorithms/sorting/quick-sort/practice-problems/algorithm/lex-finds-beauty-0d0bc1b6/",
    },
    {
      name: "Find the Next!",
      difficulty: "Easy",
      successRate: "59%",
      link: "https://www.hackerearth.com/practice/algorithms/sorting/quick-sort/practice-problems/algorithm/yet-to-keep-6f89250c/",
    },
    {
      name: "Noor and his pond",
      difficulty: "Medium",
      successRate: "82%",
      link: "https://www.hackerearth.com/practice/algorithms/sorting/quick-sort/practice-problems/algorithm/noor-and-his-pond-760eabe0/",
    },
    {
      name: "Card game",
      difficulty: "Easy",
      successRate: "94%",
      link: "https://www.hackerearth.com/practice/algorithms/sorting/quick-sort/practice-problems/algorithm/card-game-1-44e9f4e7/",
    },
    {
      name: "Missing Number",
      difficulty: "Easy",
      successRate: "87%",
      link: "https://www.hackerearth.com/practice/algorithms/sorting/quick-sort/practice-problems/algorithm/biggest-cake-possible-6d5915e7/",
    },
    {
      name: "Max power",
      difficulty: "Easy",
      successRate: "19%",
      link: "https://www.hackerearth.com/practice/algorithms/sorting/quick-sort/practice-problems/algorithm/increasing-subsequence-fbb63e3c/",
    },
    {
      name: "One-sized Game",
      difficulty: "Medium",
      successRate: "50%",
      link: "https://www.hackerearth.com/practice/algorithms/sorting/quick-sort/practice-problems/algorithm/one-sized-game/",
    },
    {
      name: "Benny and Gifts",
      difficulty: "Easy",
      successRate: "69%",
      link: "https://www.hackerearth.com/practice/algorithms/sorting/quick-sort/practice-problems/algorithm/benny-and-gifts-marcheasy-3/",
    },
    {
      name: "Earth and the Meteorites",
      difficulty: "Easy",
      successRate: "50%",
      link: "https://www.hackerearth.com/practice/algorithms/sorting/quick-sort/practice-problems/algorithm/earthandthemeteorites-qualifier2/",
    },
    {
      name: "Prom Night",
      difficulty: "Easy",
      successRate: "62%",
      link: "https://www.hackerearth.com/practice/algorithms/sorting/quick-sort/practice-problems/algorithm/prom-night/",
    },
    {
      name: "Beautiful Strings",
      difficulty: "Medium",
      successRate: "84%",
      link: "https://www.hackerearth.com/practice/algorithms/sorting/quick-sort/practice-problems/algorithm/beautiful-strings-10/",
    },
    {
      name: "Gotta catch them all!",
      difficulty: "Easy",
      successRate: "55%",
      link: "https://www.hackerearth.com/practice/algorithms/sorting/quick-sort/practice-problems/algorithm/gotta-catch-em-all/",
    },
  ]);

  const [currentPage, setCurrentPage] = useState("quiz");

  return (
    <div>
      <button
        onClick={() =>
          setCurrentPage(currentPage === "quiz" ? "problems" : "quiz")
        }
      >
        Go to {currentPage === "quiz" ? "Problems" : "Quiz"}
      </button>

      {currentPage === "quiz" ? (
        <Quiz questions={questions} />
      ) : (
        <Problems problems={problems} />
      )}
    </div>
  );
};

export default Test;
