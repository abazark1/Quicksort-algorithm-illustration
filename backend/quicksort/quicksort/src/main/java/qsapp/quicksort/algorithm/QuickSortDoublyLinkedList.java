package qsapp.quicksort.algorithm;

import lombok.NoArgsConstructor;
import java.util.List;
import java.util.Set;
import java.util.HashSet;

@NoArgsConstructor
public class QuickSortDoublyLinkedList implements SortStrategy{
    private DoublyNode head;
    private Set<Integer> finalizedIndices;

    public QuickSortDoublyLinkedList(DoublyNode head){
        this.head = head;
    }
    @Override
    public void sort(List<String> outputs){
        finalizedIndices = new HashSet<>();
        quicksort(head, outputs);
    }

    public void quicksort(DoublyNode H, List<String> animations){
        if (H.next != H){
            QS(H, H,  animations);
        }
        animations.add("Final, " + printList(H));
    }

    public void QS(DoublyNode p, DoublyNode r, List<String> animations){
        if (p.next != r && p.next != r.prev){
            DoublyNode t = partition(p, r, animations);
            markFinal(t, animations);
            QS(p, t, animations);
            QS(t, r, animations);
        } else if (p.next != null) {
            markFinal(p.next, animations);
        }
    }

    public DoublyNode partition(DoublyNode p, DoublyNode r, List<String> animations) {
        DoublyNode t = p.next;
        animations.add("pivot," + t.val + "," + getIndexOfElement(t));
        DoublyNode s = t.next;
        animations.add("init,s," + s.val + "," + getIndexOfElement(s));

        while (s != r) {
            animations.add("compare," + s.val + "," + getIndexOfElement(s) + "," + t.val + "," + getIndexOfElement(t));
            if (s.val >= t.val) {
                s = s.next;
                if(s.val != null){
                    animations.add("move,s," + s.val + "," + getIndexOfElement(s));
                } else {
                    animations.add("move,s,\\");
                }
            } else {
                DoublyNode q = s;
                s = s.next;

                animations.add("init,q," + q.val + "," + getIndexOfElement(q));
                if(s.val != null){
                    animations.add("move,s," + s.val + "," + getIndexOfElement(s));
                }else {
                    animations.add("move,s,\\");
                }
                animations.add("unlink," + q.val + "," + getIndexOfElement(q));
                animations.add("precede," + q.val + "," + getIndexOfElement(q) + "," + t.val + "," + getIndexOfElement(t));
                unlink(q);
                precede(q, t);
            }
        }
        return t;
    }

    public void unlink(DoublyNode q) {
        DoublyNode p = q.prev;
        DoublyNode r = q.next;
        p.next = r;
        r.prev = p;
        q.prev = q.next = q;
    }

    public void precede(DoublyNode q, DoublyNode r) {
        DoublyNode p = r.prev;
        q.prev = p;
        q.next = r;
        p.next = r.prev = q;
    }

    public String printList(DoublyNode head) {
        StringBuilder sb = new StringBuilder();
        if (head != null && head.next != head) {
            DoublyNode curr = head.next;
            do {
                sb.append(curr.val).append(" ");
                curr = curr.next;
            } while (curr != head);
        }
        return sb.toString();
    }

    private int getIndexOfElement(DoublyNode node) {
        if (node == null || node == head) {
            return -1;
        }
        DoublyNode current = head.next;
        int index = 2;
        while (current != head) {
            if (current == node) {
                return index;
            }
            current = current.next;
            index++;
        }
        return -1;
    }

    private void markFinal(DoublyNode node, List<String> animations) {
        int index = getIndexOfElement(node);
        if (!finalizedIndices.contains(index)) {
            animations.add("final," + node.val + "," + index);
            finalizedIndices.add(index);
        }
    }
}
