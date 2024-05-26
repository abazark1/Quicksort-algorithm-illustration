package qsapp.quicksort.algorithm;
import java.util.ArrayList;
import java.util.List;

public class SortingContext {
    private SortStrategy sortStrategy;

    public SortingContext(SortStrategy sortStrategy){
        this.sortStrategy = sortStrategy;
    }

    public List<String> executeSort() {
        List<String> outputs = new ArrayList<>();
        sortStrategy.sort(outputs);
        return outputs;
    }
}
