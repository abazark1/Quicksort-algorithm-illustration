package qsapp.quicksort;
import org.junit.jupiter.api.Test;
import qsapp.quicksort.algorithm.Node;
import qsapp.quicksort.algorithm.DoublyNode;
import qsapp.quicksort.algorithm.QuicksortArray;
import qsapp.quicksort.algorithm.QuickSortLinkedList;
import qsapp.quicksort.algorithm.QuickSortDoublyLinkedList;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

public class QuickSortTests {

    /* Quicksort Array testing*/
    @Test
    public void testSwap() {
        QuicksortArray sorter = new QuicksortArray();

        int[] array = {1, 2, 3, 4, 5};
        int[] expectedArray = {1, 4, 3, 2, 5};

        sorter.swap(array, 1, 3);
        assertArrayEquals(expectedArray, array);
    }

    @Test
    public void testPartitionArray() {
        int[] array = {3, 2, 1, 5, 4};
        QuicksortArray sorter = new QuicksortArray();
        List<String> animations = new ArrayList<>();
        int pivotIndex = sorter.partition(array, 0, array.length - 1, animations);
        for (int i = 0; i < pivotIndex; i++) {
            assertTrue(array[i] <= array[pivotIndex]);
        }
        for (int i = pivotIndex + 1; i < array.length; i++) {
            assertTrue(array[i] > array[pivotIndex]);
        }

        int[] array2 = {38, 2, 901, 534, 45, 67, 785, 34};
        QuicksortArray sorter2 = new QuicksortArray();
        List<String> animations2 = new ArrayList<>();
        int pivotIndex2 = sorter2.partition(array2, 0, array2.length - 1, animations2);
        for (int i = 0; i < pivotIndex2; i++) {
            assertTrue(array2[i] <= array2[pivotIndex2]);
        }
        for (int i = pivotIndex2 + 1; i < array2.length; i++) {
            assertTrue(array2[i] > array2[pivotIndex2]);
        }
    }

    @Test
    public void testZeroAndOneElementArray(){
        List<String> animations = new ArrayList<>();
        int[] zeroElement = {};
        QuicksortArray sorterZero = new QuicksortArray(zeroElement);
        sorterZero.sort(animations);
        int[] expectedZero = {};
        assertArrayEquals(expectedZero, zeroElement);

        int[] oneElement = {4};
        QuicksortArray sorterOne = new QuicksortArray(oneElement);
        sorterOne.sort(animations);
        int[] expectedOne = {4};
        assertArrayEquals(expectedOne, oneElement);
    }

    @Test
    public void testSortedArray(){
        List<String> animations = new ArrayList<>();
        int[] sorted = {1, 89, 234, 678, 890, 991, 996};
        QuicksortArray sorterSorted = new QuicksortArray(sorted);
        sorterSorted.sort(animations);
        int[] expectedSorted = {1, 89, 234, 678, 890, 991, 996};
        assertArrayEquals(expectedSorted, sorted);
    }

    @Test
    public void testReversedArray(){
        List<String> animations = new ArrayList<>();
        int[] reversed = {999, 764, 348, 178, 46, 23, 19, 11, 7, 3};
        QuicksortArray sorterReversed= new QuicksortArray(reversed);
        sorterReversed.sort(animations);
        int[] expectedReversed = {3, 7, 11, 19, 23, 46, 178, 348, 764, 999};
        assertArrayEquals(expectedReversed, reversed);
    }

    @Test
    public void testSortArray() {
        int[] array = {3, 2, 1, 5, 4};
        QuicksortArray sorter = new QuicksortArray(array);
        List<String> animations = new ArrayList<>();
        sorter.sort(animations);
        int[] expectedArray = {1, 2, 3, 4, 5};
        assertArrayEquals(expectedArray, array);

        int[] array2 = {78, 45, 22, 895, 678, 345, 2};
        QuicksortArray sorter2 = new QuicksortArray(array2);
        List<String> animations2 = new ArrayList<>();
        sorter2.sort(animations2);
        int[] expectedArray2 = {2, 22, 45, 78, 345, 678, 895};
        assertArrayEquals(expectedArray2, array2);

        int[] array3 = {789, 456, 23, 789, 45, 8, 56, 8, 789};
        QuicksortArray sorter3 = new QuicksortArray(array3);
        List<String> animations3 = new ArrayList<>();
        sorter3.sort(animations3);
        int[] expectedArray3 = {8, 8, 23, 45, 56, 456, 789, 789, 789};
        assertArrayEquals(expectedArray3, array3);
    }


    /* Quicksort one-way list with a header testing */
    @Test
    void testPartitionLinkedList() {
        Node head  = new Node(null);
        Node pivot = new Node(4);
        Node six = new Node(6);
        Node two = new Node(2);
        Node nine = new Node(9);
        Node five = new Node(5);
        head.next = pivot;
        pivot.next = six;
        six.next = two;
        two.next = nine;
        nine.next = five;

        QuickSortLinkedList ll = new QuickSortLinkedList(head);
        List<String> animations = new ArrayList<>();

        ll.partition(head, pivot, null, animations);
        assertEquals("2->4->6->9->5", ll.printList(head), "After first partition, '4' (pivot) should be in its correct place");

        QuickSortLinkedList ll2 = new QuickSortLinkedList(pivot);
        ll2.partition(pivot, six, null, animations);
        assertEquals("5->6->9", ll2.printList(pivot), "After second partition, '6' (pivot) should be in its correct place");
        assertFalse(animations.isEmpty(), "Animations list should not be empty");
    }

    @Test
    public void testZeroAndOneElementList(){
        List<String> animations = new ArrayList<>();
        Node zeroElement = new Node(null);
        QuickSortLinkedList sorterZero = new QuickSortLinkedList(zeroElement);
        sorterZero.sort(animations);
        assertEquals("", sorterZero.printList(zeroElement));
        assertFalse(animations.isEmpty(), "Animations list should be empty");


        Node oneElement = new Node(null);
        oneElement.next = new Node(5);
        QuickSortLinkedList sorterOne = new QuickSortLinkedList(oneElement);
        sorterOne.sort(animations);
        assertEquals("5", sorterOne.printList(oneElement));
        assertFalse(animations.isEmpty(), "Animations list should not be empty");
    }


    @Test
    public void testSortedList(){
        List<String> animations = new ArrayList<>();
        Node sorted = new Node(null);
        sorted.next = new Node(5);
        sorted.next.next = new Node(89);
        sorted.next.next.next = new Node(234);
        sorted.next.next.next.next = new Node(678);
        QuickSortLinkedList sorterSorted = new QuickSortLinkedList(sorted);
        sorterSorted.sort(animations);
        assertEquals("5->89->234->678", sorterSorted.printList(sorted));
        assertFalse(animations.isEmpty(), "Animations list should not be empty");
    }

    @Test
    public void testReversedList(){
        List<String> animations = new ArrayList<>();
        Node reversed = new Node(null);
        reversed.next = new Node(999);
        reversed.next.next = new Node(764);
        reversed.next.next.next = new Node(348);
        reversed.next.next.next.next = new Node(46);
        reversed.next.next.next.next.next = new Node(3);
        QuickSortLinkedList sorterReversed= new QuickSortLinkedList(reversed);
        sorterReversed.sort(animations);
        assertEquals("3->46->348->764->999", sorterReversed.printList(reversed));
        assertFalse(animations.isEmpty(), "Animations list should not be empty");
    }

    @Test
    void testSortLinkedList() {
        Node head = new Node(null);
        head.next = new Node(3);
        head.next.next = new Node(1);
        head.next.next.next = new Node(4);
        head.next.next.next.next = new Node(2);
        QuickSortLinkedList ll = new QuickSortLinkedList(head);
        List<String> animations = new ArrayList<>();
        ll.sort(animations);
        assertEquals("1->2->3->4", ll.printList(head));
        assertFalse(animations.isEmpty());

        Node head2 = new Node(null);
        head2.next = new Node(789);
        head2.next.next = new Node(456);
        head2.next.next.next = new Node(23);
        head2.next.next.next.next = new Node(789);
        head2.next.next.next.next.next = new Node(45);
        head2.next.next.next.next.next.next = new Node(8);
        head2.next.next.next.next.next.next.next = new Node(56);
        head2.next.next.next.next.next.next.next.next = new Node(8);
        head2.next.next.next.next.next.next.next.next.next = new Node(789);
        QuickSortLinkedList sorter2 = new QuickSortLinkedList(head2);
        List<String> animations2 = new ArrayList<>();
        sorter2.sort(animations2);
        assertEquals("8->8->23->45->56->456->789->789->789", sorter2.printList(head2));
    }


    /* Quicksort cyclic two-way lists testing*/
    @Test
    public void testUnlinkAndPrecede() {
        int[] testData = {3, 2, 1, 5, 4};
        DoublyNode head = createTestData(testData);
        QuickSortDoublyLinkedList unlinkAndPrecede = new QuickSortDoublyLinkedList();
        DoublyNode nodeToRemove = head.next.next;
        unlinkAndPrecede.unlink(nodeToRemove);
        assertEquals("3 1 5 4 ", unlinkAndPrecede.printList(head));

        unlinkAndPrecede.precede(nodeToRemove, head.next);
        assertEquals("2 3 1 5 4 ", unlinkAndPrecede.printList(head));

        DoublyNode nodeToAdd = new DoublyNode(8);
        unlinkAndPrecede.precede(nodeToAdd, head.next.next);
        assertEquals("2 8 3 1 5 4 ", unlinkAndPrecede.printList(head));
    }

    @Test
    public void testPartitionDoublyLinkedList() {
        int[] testData = {3, 2, 1, 5, 4};
        DoublyNode head = createTestData(testData);

        QuickSortDoublyLinkedList sorter = new QuickSortDoublyLinkedList(head);
        List<String> animations = new ArrayList<>();
        DoublyNode p = head;
        DoublyNode r = head;

        DoublyNode pivot = sorter.partition(p, r, animations);
        assertEquals(3, pivot.val);
        assertEquals("2 1 3 5 4 ", sorter.printList(head));

        DoublyNode part2 = sorter.partition(p, pivot, animations);
        assertEquals("1 2 3 5 4 ", sorter.printList(head));

        DoublyNode part3 = sorter.partition(pivot, r, animations);
        assertEquals("1 2 3 4 5 ", sorter.printList(head));
    }

    @Test
    public void testZeroAndOneElementDList(){
        List<String> animations = new ArrayList<>();
        DoublyNode zeroElement = new DoublyNode(null);
        zeroElement.next = zeroElement;
        zeroElement.prev = zeroElement;
        QuickSortDoublyLinkedList sorterZero = new QuickSortDoublyLinkedList(zeroElement);
        sorterZero.sort(animations);
        assertEquals("", sorterZero.printList(zeroElement));

        int[] oneElementData = {4};
        DoublyNode oneElement = createTestData(oneElementData);
        QuickSortDoublyLinkedList sorterOne = new QuickSortDoublyLinkedList(oneElement);
        sorterOne.sort(animations);
        assertEquals("4 ", sorterOne.printList(oneElement));
    }

    @Test
    public void testSortedDList(){
        List<String> animations = new ArrayList<>();
        int[] sortedData = {1, 89, 234, 678, 890, 991, 996};
        DoublyNode sorted = createTestData(sortedData);
        QuickSortDoublyLinkedList sorterSorted = new QuickSortDoublyLinkedList(sorted);
        sorterSorted.sort(animations);
        assertEquals("1 89 234 678 890 991 996 ", sorterSorted.printList(sorted));
    }

    @Test
    public void testReversedDList(){
        List<String> animations = new ArrayList<>();
        int[] reversedData = {999, 764, 348, 178, 46, 23, 19, 11, 7, 3};
        DoublyNode reversed = createTestData(reversedData);
        QuickSortDoublyLinkedList sorterReversed= new QuickSortDoublyLinkedList(reversed);
        sorterReversed.sort(animations);
        assertEquals("3 7 11 19 23 46 178 348 764 999 ", sorterReversed.printList(reversed));
    }

    @Test
    public void testSortDoublyLinkedList() {
        int[] testData = {3, 2, 1, 5, 4};
        DoublyNode head = createTestData(testData);
        QuickSortDoublyLinkedList sorter = new QuickSortDoublyLinkedList(head);
        List<String> outputs = new ArrayList<>();
        sorter.sort(outputs);
        assertEquals("1 2 3 4 5 ", sorter.printList(head));

        int[] testData2 = {78, 45, 22, 895, 678, 345, 2};
        DoublyNode head2 = createTestData(testData2);
        QuickSortDoublyLinkedList sorter2 = new QuickSortDoublyLinkedList(head2);
        List<String> outputs2 = new ArrayList<>();
        sorter2.sort(outputs2);
        assertEquals("2 22 45 78 345 678 895 ", sorter2.printList(head2));

        int[] testData3 = {789, 456, 23, 789, 45, 8, 56, 8, 789};
        DoublyNode head3 = createTestData(testData3);
        QuickSortDoublyLinkedList sorter3 = new QuickSortDoublyLinkedList(head3);
        List<String> outputs3 = new ArrayList<>();
        sorter3.sort(outputs3);
        assertEquals("8 8 23 45 56 456 789 789 789 ", sorter3.printList(head3));
    }

    private DoublyNode createTestData(int[] data){
        if (data == null || data.length == 0) return null;
        DoublyNode head = new DoublyNode(null);
        head.next = head;
        head.prev = head;
        DoublyNode temp = head;

        for (int i = 0; i < data.length; i++) {
            DoublyNode newNode = new DoublyNode(data[i], temp);
            newNode.next = head;
            temp.next = newNode;
            head.prev = newNode;
            temp = newNode;
        }

        if(head != null && temp != null){
            temp.next = head;
            head.prev = temp;
        }
        return head;
    }
}
