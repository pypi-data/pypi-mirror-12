
from operator import mul

def prod(x):
    return reduce(mul, x, 1)
