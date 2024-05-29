import React, { useState } from "react";
import "./Tutorial.css";

const tutorialContent = {
  "quicksort-arrays": {
    title: "Quicksort for Arrays",
    content: (
      <div>
        <p>
          Quicksort is a divide-and-conquer algorithm. Quicksort first divides a large array into two smaller sub-arrays: 
          the low elements and the high elements. Quicksort can then recursively sort the sub-arrays.
        </p>
        <p> The steps are:</p>
        <ul>
          <li>
            Pick an element, called <i>pivot</i>, from the array.
          </li>
          <li>
            Partitioning: reorder the array so that all elements with values less than the <i>pivot</i> come before the <i>pivot</i>, 
            while all elements with values exceeding the <i>pivot</i> come after it (equal values can go either way). 
            After this partitioning, the <i>pivot</i> is in its final position. This is called the partition operation
          </li>
          <li>
            Recursively apply the above steps to the sub-array of elements with smaller values and separately 
            to the sub-array of elements with greater values.
          </li>
          <li>
            The base case of the recursion is arrays of size zero or one, which
            are in order by definition, so they never need to be sorted
          </li>
          <p>
            The <i>pivot</i> selection and partitioning steps can be done in several ways; 
            the choice of specific implementation schemes significantly affects the algorithm's performance.
          </p>
        </ul>
        <div className="image-container">
          <img src="../public/Quicksort.png" alt="Quicksort structogram" style={{ width: "30%", height: "auto" }}/>
          <img src="../public/Quicksort2.png" alt="Quicksort structogram" className="tutorial-image"/>
        </div>
        <p>
          The efficiency of the Quicksort algorithm depends on the good choice of the pivot. A bad choice of the pivot will decrease the performance
          significantly. For example: if the dataset is already in a particular order, such as reversed,selecting the first or last element as pivot
          would lead to poor performance. This is because the pivot fails to divide the range equally, causing the quadratic time complexity - Θ(n^2). 
          While the optimal choice of the pivot selection would be the median, as it perfectly divides the range into two equal halves, finding the true 
          median can be time-consuming for practical purposes. A more feasible strategy would be choosing the pivot randomly. Through randomization, 
          the algorithm avoids the worst-case scenarios of a fixed pivot choice and improves its average time complexity - Θ(n*logn).
        </p>
        <p>
          It is important to note that quicksort for arrays is not stable. Unstable sorting means that the equal elements are not guaranteed 
          to retain their original relative order. The main reason for it is the swap function, that interchanges the elements that have to be 
          swapped during the process. However, there is an optimization possibility to be considered. For small arrays, insertion sort usually 
          behaves better than quicksort, due to its lower overhead. Insertion sort is another sorting algorithm that builds the final result one 
          element at a time by comparisons. So in the implementation of the quicksort, when the sub-array is smaller than predefined threshold, 
          the algorithm can switch to insertion sort, which will speed-up the process significantly.
        </p>
      </div>
    ),
  },
  "quicksort-linked-lists": {
    title: "Quicksort for Linked Lists",
    content: (
      <div>
        <p>
          One-way lists or singly linked lists is a linear data structure consisting of keys (elements) where each key has a pointer to the next
          key in the list. The last element has a reference NULL which means the end of the list. In this work, we are working with one-way lists
          with a header node. This header node, situated at the zeroth place, serves as a starting point that points to the first actual element in
          the list. Compared to arrays, linked lists are better in terms of efficient insertion and deletion operations due to its dynamic memory
          allocation. Quicksort for singly linked lists follows the base structure of the algorithm, but there is one difference. As mentioned
          earlier, quicksort for arrays is not stable, but it is a different picture for linked lists. Quicksort can be made stable by replacing
          the swap with two alternative common linked list operations: unlink and precede. By using these functions, now we will have a stable
          sorting algorithm. For simplicity and effectiveness, the pivot should be the first element of the list. This choice simplifies the logic in
          the following way: if the next element is greater than the pivot the algorithm moves to the next element; if the next element is less than
          the pivot, it is unlinked from its current position without disrupting the rest of the elements, and then reinserted right before the pivot
          element. This method of moving the elements around the pivot, instead of swapping them, maintains the initial relative order of elements.
        </p>
        <p>Here's a breakdown of the process:</p>
        <ul>
          <li>
            <b> Pick a <i>pivot</i>:</b> Similar to arrays, you choose a node as the <i>pivot</i>. In this цщкл the pivot is the first node
          </li>
          <li>
            <b>Partitioning:</b> Unlike arrays where elements can be directly swapped, linked lists require re-linking pointers. 
            Traverse the linked list, comparing each node's value with the <i>pivot</i>. If the node's value is less than the <i>pivot</i>,
            then unlink the element, and instert it back right before the <i>pivot</i>.
          </li>
          <li>
            <b>Recursive sorting:</b> Recursively sort the values less than and greater than the <i>pivot</i>
            using quicksort for linked lists.
          </li>
          <p>
            <b>Note:</b> Quick Sort for linked lists might not always be the most efficient sorting algorithm due to the overhead of pointer
            manipulation. For very large linked lists, alternative sorting algorithms like Merge Sort might be more suitable.
          </p>
        </ul>
      </div>
    ),
  },
  "quicksort-double-linked-lists": {
    title: "Quicksort for Doubly Linked Lists",
    content: (
      <div>
        <p>
          Two-way list or a doubly linked list is a more complex type of linked list. Each element in a doubly linked list contains three main
          components: a key, a pointer to the next element, and a pointer to the previous element in the sequence. In addition to these features,
          cyclic two-way lists have a unique characteristic: they are circular. This means that the list does not terminate with null. Instead, the
          last element's next pointer directs back to the header, and correspondingly, the first element's previous pointer refers back to
          the header.
        </p>
        <div className="image-container">
          <img src="../../../public/cyclic-two-way-list.png" alt="Cyclic two-way list" style={{ width: "50%", height: "auto" }}/>
        </div>
        <p>
          Quicksort for cyclic two-way lists is very similar to the implementation of singly linked lists. In both cases, the algorithm
          uses unlink and precede operations to sort the list. They ensure the original order of the list maintaining stability.
        </p>
        <p>
          Primary steps for QuickSort on a doubly linked list are as follows:
        </p>
        <ul>
          <li>
            <b>Partitioning:</b> Choosing a <i>pivot</i> element within the linked list constitutes partitioning. The nodes are then rearranged
            so that all nodes with values below the <i>pivot</i> are placed before it, and all nodes with values above the <i>pivot</i> are
            placed after it. The nodes' next and prior pointers are modified during this partitioning process.
          </li>
          <li>
            <b>Recursion:</b> Recursive application of Quick Sort on the sub-lists before and after the <i>pivot</i> node is in the proper position.
          </li>
          <li>
            <b>Combining:</b> We finally combine the sorted sub-lists to create a completely sorted doubly linked list.
          </li>
        </ul>
      </div>
    ),
  },
};

function Tutorial() {
  const [selectedTopic, setSelectedTopic] = useState("quicksort-arrays");

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
  };

  return (
    <div className="tutorial-container">
      <div className="sidebar">
        <h2>Quick Sort Tutorials</h2>
        <ul>
          {Object.keys(tutorialContent).map((topic) => (
            <li key={topic}>
              <button className={topic === selectedTopic ? "active" : ""} onClick={() => handleTopicClick(topic)}>
                {tutorialContent[topic].title}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="content">
        <h2>{tutorialContent[selectedTopic].title}</h2>
        {tutorialContent[selectedTopic].content}
      </div>
    </div>
  );
}

export default Tutorial;
