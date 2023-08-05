from disco.core import result_iterator

from discomll import dataset
from discomll.ensemble import distributed_weighted_forest_rand
from discomll.utils import accuracy

train = dataset.Data(data_tag=[
    ["http://archive.ics.uci.edu/ml/machine-learning-databases/breast-cancer-wisconsin/breast-cancer-wisconsin.data"]],
    id_index=0,
    X_indices=xrange(1, 10),
    X_meta="http://ropot.ijs.si/data/datasets_meta/breastcancer_meta.csv",
    y_index=10,
    delimiter=",")

fit_model = distributed_weighted_forest_rand.fit(train, trees_per_chunk=3, max_tree_nodes=50, min_samples_leaf=5,
                                                 min_samples_split=10, class_majority=1,
                                                 measure="info_gain", num_medoids=10, accuracy=1, separate_max=True,
                                                 random_state=None, save_results=True)

# predict training dataset
predictions = distributed_weighted_forest_rand.predict(train, fit_model)

# output results
for k, v in result_iterator(predictions):
    print k, v[0]

# measure accuracy
ca = accuracy.measure(train, predictions)
print ca
