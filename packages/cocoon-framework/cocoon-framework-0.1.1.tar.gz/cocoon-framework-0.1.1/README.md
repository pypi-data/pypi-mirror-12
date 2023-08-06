Cocoon Framework
=======================

Cocoon is a framework for defining workflows consisting of 
Python tasks, shell scripts, SQL, etc.

## Quick Start

```shell
# Install cocoon from pypi using pip
$ pip install cocoon-framework
    
# Create a new workflow project
$ cocoon create myworkflow

$ cd myworkflow

# Run a workflow
$ cocoon run
```

## Defining a workflow

```python
from cocoon.task import PyTask, ShellTask, SQLTask
    
t1 = ShellTask(
    id="print_hello", 
    command = 'echo hello cocoon!')
         
t2 = SQLTask(
    database = 'sample_datasets'
    query = 'SELECT count(1) FROM www_access')

t2.depends_on(t1)
```

Run a task in the workflow
```
$ cocoon run t2
```

## SQL Templates

```python
from cocoon.task import SQLTask
    
cleanup = SQLTask(
    query = 'DROP TABLE IF EXISTS recent_data'
)
    c
## SCHEDULED_TIME will be replaced to a task execution time
q1 = SQLTask(
    query = 'CREATE TABLE AS recent_data SELECT * FROM www_access WHERE time >= {{SCHEDULED_TIME}}')
).depends_on(cleanup)

q2 = SQLTask(
    query = 'SELECT count(*) from recent_data'
).depends_on(q1)
```

```
# List-up tasks
$ cocoon list
    
# Run a workflow 
$ cocoon run q2
```
