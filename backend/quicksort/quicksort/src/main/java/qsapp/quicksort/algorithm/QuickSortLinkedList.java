package qsapp.quicksort.algorithm;

import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
public class QuickSortLinkedList implements SortStrategy {
    private Node head;

    public QuickSortLinkedList(Node head){
        this.head = head;
    }

    @Override
    public void sort(List<String> outputs){
        quicksort(head, outputs);
    }

    public void quicksort(Node h, List<String> animations){
        QS(h, null, animations);
        animations.add("Final," + printList(h));
    }

    public void QS(Node p, Node r, List<String> animations){
        Node t = p.next;
        if (t != r && t.next != r){
            partition(p, t, r, animations);
            animations.add("final," + t.val + "," + getIndexOfElement(t));
            QS(p, t, animations);
            QS(t, r, animations);
        } else {
            if(t != null){
                animations.add("final," + t.val + "," + getIndexOfElement(t));
            }
        }
    }

    public void partition(Node p, Node t, Node r, List<String> animations){
        animations.add("pivot," + t.val + "," + getIndexOfElement(t));
        animations.add("init,p,\\" + "," + getIndexOfElement(p));
        Node s = t.next;
        animations.add("init,s," + s.val + "," + getIndexOfElement(s));
        Node ps = t;
        animations.add("init,ps," + ps.val + "," + getIndexOfElement(ps));
        while (s != r){
            animations.add("compare," + s.val + "," + getIndexOfElement(s) + "," + t.val + "," + getIndexOfElement(t));
            if (s.val >= t.val){
                ps = s;
                s = s.next;
                if (s != null){
                    animations.add("move,s," + s.val + "," + getIndexOfElement(s) + ",ps," + ps.val + "," + getIndexOfElement(ps));
                } else {
                    animations.add("move,s, ," + (getListLength() + 1) +  ",ps," + ps.val + "," + getIndexOfElement(ps));
                }
            } else {
                Node q = s;
                animations.add("init,q," + q.val + "," + getIndexOfElement(q));
                s = s.next;
                if(s != null){
                    animations.add("move,s," + s.val + "," + getIndexOfElement(s));
                } else {
                    animations.add("move,s, ," + (getListLength() + 1));
                }
                animations.add("unlink," + q.val + "," + getIndexOfElement(q));
                animations.add("precede," + q.val + "," + getIndexOfElement(q) + "," + t.val + "," + getIndexOfElement(t));
                ps.next = s;

                q.next = p.next;
                p.next = q;
                p = q;
                animations.add("move,p," + p.val + "," + getIndexOfElement(p));
            }
        }
    }

    public String printList(Node head) {
        StringBuilder sb = new StringBuilder();
        Node current = head.next;
        while (current != null) {
            sb.append(current.val).append("->");
            current = current.next;
        }
        if (!sb.isEmpty()) {
            sb.setLength(sb.length() - 2);
        }
        return sb.toString();
    }

    private int getIndexOfElement(Node node) {
        Node current = head;
        int index = 1;
        while (current != null) {
            if (current == node) {
                return index;
            }
            current = current.next;
            index++;
        }
        return -1;
    }

    private int getListLength(){
        Node current = head;
        int length = 0;
        while (current != null) {
            current = current.next;
            length++;
        }
        return length;
    }
}
