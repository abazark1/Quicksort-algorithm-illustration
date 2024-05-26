package qsapp.quicksort.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import qsapp.quicksort.algorithm.*;

import qsapp.quicksort.model.SortRequest;

import java.util.List;

@RestController
@CrossOrigin(origins="http://localhost:5173")

public class SortingController {

    @PostMapping("//cors")
    public ResponseEntity<List<String>> sort(@RequestBody SortRequest request){
        try {
            int[] data = request.getData();
            String algorithm = request.getAlgorithm();

            if (data == null || algorithm == null || algorithm.isEmpty()) {
                return ResponseEntity.badRequest().body(List.of("Invalid data or algorithm"));
            }

            SortingContext context;

            switch (algorithm) {
                case "array":
                    context = new SortingContext(new QuicksortArray(data));
                    break;
                case "linkedList":
                    Node head = arrayToLinkedList(data);
                    context = new SortingContext(new QuickSortLinkedList(head));
                    break;
                case "doublyLinkedList":
                    DoublyNode dHead = arrayToDoublyLinkedList(data);
                    context = new SortingContext(new QuickSortDoublyLinkedList(dHead));
                    break;
                default:
                    return ResponseEntity.badRequest().build();
            }

            List<String> result = context.executeSort();
            System.out.println(result.toString());
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(List.of("Internal server error: " + e.getMessage()));
        }
    }

    private DoublyNode arrayToDoublyLinkedList(int[] data){
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

    private Node arrayToLinkedList(int[] data) {
        Node header = new Node(0);
        Node current = header;
        for (int val : data) {
            current.next = new Node(val);
            current = current.next;
        }
        return header;
    }
}
