package qsapp.quicksort.algorithm;

public class DoublyNode {
    public Integer val;
    public DoublyNode next;
    public DoublyNode prev;

    public DoublyNode(Integer val) {
        this.val = val;
    }

    public DoublyNode(Integer val, DoublyNode prev) {
        this.val = val;
        this.prev = prev;
    }
}
