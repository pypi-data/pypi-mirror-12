Pyppo
=====


Pyppo is a simple flow base programming micro framework for Python.


Examples
--------


Simple pipeline
+++++++++++++++

This is an example of a very simple `pipeline`. Simply pass a list functions
to be executed at the pipeline execution.

.. code-block:: python 
    
    obj = []

    def do_something(obj):
        obj.append(1)
        return obj

    def do_something_else(obj):
        obj.append(2)
        return obj

    consume(pipeline([obj], [do_something, do_something_else]))

    print(obj)
    [1, 2]




Fork pipeline
+++++++++++++

This example shows a fork of a pipeline. `fork` is essentially another
pipeline steps except it acceptes a list of function branches.

.. code-block:: python
    
    obj = []
    def first_step(obj):
        obj.append(1)
        return obj
        
    def branch_add_two(obj):
        obj.append(2)
        return obj
    
    def branch_add_four(obj):
        obj.append(4)
        return obj
                                                                           
    pipeline([obj], first_step, fork([branch_add_two], [branch_add_four]))
    

Validate pipeline steps
+++++++++++++++++++++++

You can also validate pipeline steps by providing a validate function
to the `validate_with` decorator as shown on the following example


.. code-block:: python   
    
    validation = lambda entry: 'x' in entry                             
    
    def add_x_to_entry(entry):
        # should add 'x' key to entry dictionary but didn't
        return entry
    
    @validate_with(validation)
    def increment_1_on_x_key(entry):
        entry['x'] += 1
        return entry
     
    entry = {}
    # consume will saise a StepValidationError
    consume(pipeline([entry], [add_x_to_entry, increment_1_on_x_key]))

