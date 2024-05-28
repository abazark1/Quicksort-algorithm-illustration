package qsapp.quicksort.algorithm;

import lombok.NoArgsConstructor;
import java.util.List;

@NoArgsConstructor
public class QuicksortArray  implements SortStrategy{
    private int[] array;
    public QuicksortArray(int[] array){
        this.array = array;
    }

    @Override
    public void sort(List<String> animations){
        quicksort(array, animations);
    }

    public void quicksort(int[] arr, List<String> animations){
        QS(arr, 0, arr.length - 1, animations);
        animations.add("Final");
    }

    public void QS(int[] arr, int p, int r, List<String> animations) {
        if (p < r) {
            int q = partition(arr, p, r, animations);
            animations.add("final," + arr[q] + "," + q);
            QS(arr, p, q - 1, animations);
            QS(arr, q + 1, r, animations);
        } else {
            if (p < arr.length) {
                animations.add("final," + arr[p] + "," + p);
            }
        }
    }

    public int partition(int[] arr, int p, int r, List<String> animations) {
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
                animations.add("compare," + arr[i] + "," + i + "," + arr[j] + "," + j);
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
}
