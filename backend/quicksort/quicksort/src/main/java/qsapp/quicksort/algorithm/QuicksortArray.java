package qsapp.quicksort.algorithm;

import lombok.NoArgsConstructor;
import java.util.List;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
public class QuicksortArray  implements SortStrategy{
    private int[] array;
    private Set<Integer> finalizedIndices;

    public QuicksortArray(int[] array){
        this.array = array;
    }

    @Override
    public void sort(List<String> animations){
        finalizedIndices = new HashSet<>();
        quicksort(array, animations);
    }

    public void quicksort(int[] arr, List<String> animations){
        QS(arr, 0, arr.length - 1, animations);
        animations.add("Final");
    }

    public void QS(int[] arr, int p, int r, List<String> animations) {
        if (p < r) {
            int q = partition(arr, p, r, animations);
            markFinal(arr, q, animations);
            // animations.add("final," + arr[q] + "," + q);
            QS(arr, p, q - 1, animations);
            QS(arr, q + 1, r, animations);
        } else {
            if (p <= arr.length) {
                markFinal(arr, p, animations);
                //animations.add("final," + arr[p] + "," + p);
            }
        }
    }

    public int partition(int[] arr, int p, int r, List<String> animations) {
        animations.add("init,p," + arr[p] + "," + p + ",r," + arr[r] + "," + r);
        int i = random(p, r);
        animations.add("pivot," + arr[i] + "," + i);
        animations.add("swappivot," + arr[i] + "," + i + "," + arr[r] + "," + r);

        swap(arr, i, r);

        i = p;
        animations.add("init,i," + arr[i] + "," + i);

        while (i < r && arr[i] <= arr[r]) {
            i++;
            animations.add("move,i," + arr[i] + "," + i);
        }

        if (i < r) {
            int j = i + 1;
            animations.add("init,j," + arr[j] + "," + j);
            while (j < r) {
                animations.add("compare," + arr[r] + "," + r + "," + arr[j] + "," + j);
                if (arr[j] < arr[r]) {
                    if (arr[j] != arr[i]) {
                        animations.add("swap," + arr[i] + "," + i + "," + arr[j] + "," + j);
                    }
                    swap(arr, i, j);
                    i++;
                }
                j++;
                animations.add("move,i," + arr[i] + "," + i + ",j," + arr[j] + "," + j);
            }
            if (arr[i] != arr[r]) {
                animations.add("swappivot," + arr[i] + "," + i + "," + arr[r] + "," + r);
            }
            swap(arr, i, r);
        }
        return i;
    }

    private int random(int p, int r){
        int range = r - p + 1;
        return (int) (Math.random() * range) + p;
    }

    public void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    private void markFinal(int[] arr, int index, List<String> animations) {
        if (index >= 0 && index < arr.length && !finalizedIndices.contains(index)) {
            animations.add("final," + arr[index] + "," + index);
            finalizedIndices.add(index);
        }
    }
}
