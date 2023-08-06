# Tree-based Pipeline Optimization Tool (TPOT)

Consider TPOT your **Data Science Assistant**. TPOT is a Python tool that automatically creates and optimizes Machine Learning pipelines using genetic programming.

TPOT will automate the most tedious part of Machine Learning by intelligently exploring thousands of possible pipelines to find the best one for your data.

![An example Machine Learning pipeline](https://github.com/rhiever/tpot/blob/master/images/tpot-ml-pipeline.png "An example Machine Learning pipeline")

<p align="center"><strong>An example Machine Learning pipeline</strong></p>

Once TPOT is finished searching (or you get tired of waiting), it provides you with the Python code for the best pipeline it found so you can tinker with the pipeline from there.

TPOT is built on top of scikit-learn, so all of the code it generates should look familiar... if you're familiar with scikit-learn, anyway.

**TPOT is still under active development** and we encourage you to check back on this repository regularly for updates.

## License

Please see the [repository license](https://github.com/rhiever/tpot/blob/master/LICENSE) for the licensing and usage information for TPOT.

## Installation

TPOT is built on top of several existing Python libraries, including:

* NumPy

* pandas

* scikit-learn

* DEAP

Except for DEAP, all of the necessary Python packages can be installed via the [Anaconda Python distribution](https://www.continuum.io/downloads), which we strongly recommend that you use. We also strongly recommend that you use of Python 3 over Python 2 if you're given the choice.

DEAP can be installed with `pip` via the command:

```Shell
pip install deap
```

**If you don't care about the details and just want to install TPOT, run the following command:**

```Shell
pip install tpot
```

`pip` should be able to sort out all of the dependencies for you.

## Usage

TPOT can be used in two ways: via code and via the command line. We will eventually develop a GUI for TPOT.

### Using TPOT via code

TPOT can be imported just like any regular Python module. To import TPOT, type:

```Python
from tpot import TPOT
```

then create an instance of TPOT as follows:

```Python
from tpot import TPOT

pipeline_optimizer = TPOT()
```

Note that you can pass several parameters to the TPOT instantiation call:

* `generations`: The number of generations to run pipeline optimization for. Must be > 0. The more generations you give TPOT to run, the longer it takes, but it's also more likely to find better pipelines.
* `population_size`: The number of pipelines in the genetic algorithm population. Must be > 0. The more pipelines in the population, the slower TPOT will run, but it's also more likely to find better pipelines.
* `mutation_rate`: The mutation rate for the genetic programming algorithm in the range [0.0, 1.0]. This tells the genetic programming algorithm how many pipelines to apply random changes to every generation. We don't recommend that you tweak this parameter unless you know what you're doing.
* `crossover_rate`: The crossover rate for the genetic programming algorithm in the range [0.0, 1.0]. This tells the genetic programming algorithm how many pipelines to "breed" every generation. We don't recommend that you tweak this parameter unless you know what you're doing.
* `random_state`: The random number generator seed for TPOT. Use this to make sure that TPOT will give you the same results each time you run it against the same data set with that seed.
* `verbosity`: How much information TPOT communicates while it's running. 0 = none, 1 = minimal, 2 = all

Some example code with custom TPOT parameters might look like:

```Python
from tpot import TPOT

pipeline_optimizer = TPOT(generations=100, rng_seed=42, verbosity=0)
```

Now TPOT is ready to work! You can pass TPOT some data with a scikit-learn-like interface:

```Python
from tpot import TPOT

pipeline_optimizer = TPOT(generations=100, rng_seed=42, verbosity=0)
pipeline_optimizer.fit(training_features, training_classes)
```

then evaluate the final pipeline as such:

```Python
from tpot import TPOT

pipeline_optimizer = TPOT(generations=100, rng_seed=42, verbosity=0)
pipeline_optimizer.fit(training_features, training_classes)
pipeline_optimizer.score(training_features, training_classes, testing_features, testing_classes)
```

Note that you need to pass the training data to the `score()` function so the pipeline re-trains the scikit-learn models on the training data.

### Using TPOT via the command line

To use TPOT via the command line, enter the following command to see the parameters that TPOT can receive:

```Shell
tpot --help
```

The following parameters will display along with their descriptions:

* `-i` / `INPUT_FILE`: The path to the data file to optimize the pipeline on. Make sure that the class column in the file is labeled as "class".
* `-is` / `INPUT_SEPARATOR`: The character used to separate columns in the input file. Commas (,) and tabs (\t) are the most common separators.
* `-g` / `GENERATIONS`: The number of generations to run pipeline optimization for. Must be > 0. The more generations you give TPOT to run, the longer it takes, but it's also more likely to find better pipelines.
* `-p` / `POPULATION`: The number of pipelines in the genetic algorithm population. Must be > 0. The more pipelines in the population, the slower TPOT will run, but it's also more likely to find better pipelines.
* `-mr` / `MUTATION_RATE`: The mutation rate for the genetic programming algorithm in the range [0.0, 1.0]. This tells the genetic programming algorithm how many pipelines to apply random changes to every generation. We don't recommend that you tweak this parameter unless you know what you're doing.
* `-xr` / `CROSSOVER_RATE`: The crossover rate for the genetic programming algorithm in the range [0.0, 1.0]. This tells the genetic programming algorithm how many pipelines to "breed" every generation. We don't recommend that you tweak this parameter unless you know what you're doing.
* `-s` / `RANDOM_STATE`: The random number generator seed for TPOT. Use this to make sure that TPOT will give you the same results each time you run it against the same data set with that seed.
* `-v` / `VERBOSITY`: How much information TPOT communicates while it's running. 0 = none, 1 = minimal, 2 = all

An example command-line call to TPOT may look like:

```Shell
tpot -i data/mnist.csv -is , -g 100 -s 42 -v 0
```

## Examples

Below is a minimal working example with the practice MNIST data set.

```python
from tpot import TPOT
from sklearn.datasets import load_digits
from sklearn.cross_validation import train_test_split

digits = load_digits()
X_train, X_test, y_train, y_test = train_test_split(digits.data, digits.target,
                                                    train_size=0.75)

tpot = TPOT(generations=5)
tpot.fit(X_train, y_train)
tpot.score(X_test, y_test)
```

Running this code should discover a pipeline that achieves >=98% testing accuracy.

## Want to get involved with TPOT?

We welcome you to [check the existing issues](https://github.com/rhiever/tpot/issues/) for bugs or enhancements to work on. If you have an idea for an extension to TPOT, please [file a new issue](https://github.com/rhiever/tpot/issues/new) so we can discuss it.

## Having problems or have questions about TPOT?

Please [check the existing open and closed issues](https://github.com/rhiever/tpot/issues?utf8=%E2%9C%93&q=is%3Aissue) to see if your issue has already been attended to. If it hasn't, please [file a new issue](https://github.com/rhiever/tpot/issues/new) on this repository so we can review your issue.
