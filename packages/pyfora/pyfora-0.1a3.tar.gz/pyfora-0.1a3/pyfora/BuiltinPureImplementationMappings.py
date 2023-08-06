#   Copyright 2015 Ufora Inc.
#
#   Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#   You may obtain a copy of the License at
#
#       http://www.apache.org/licenses/LICENSE-2.0
#
#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#   limitations under the License.

import pyfora.PureImplementationMapping as PureImplementationMapping
import pyfora.PureImplementationMappings as PureImplementationMappings

class Len:
	def __call__(self, other):
		return other.__len__()

class Range:
    def __call__(self, first, second=None, increment=None):
        return list(xrange(first, second, increment))

class XRangeInstance:
    def __init__(self, start, count, increment):
        self.start = start
        self.count = count
        self.increment = increment

    def __iter__(self):
        currentVal = self.start
        ix = 0

        while ix < self.count:
            yield currentVal
            currentVal = currentVal + self.increment
            ix = ix + 1


    def __pyfora_generator__(self):
        class Generator:
            def __init__(self, start, count, increment):
                self.start = start
                self.count = count
                self.increment = increment

            def __pyfora_generator__(self):
                return self

            def __iter__(self):
                ix = 0
                currentVal = self.start
                while ix < self.count:
                    yield currentVal
                    currentVal = currentVal + self.increment
                    ix = ix + 1

            def isNestedGenerator(self):
                return False

            def canSplit(self):
                return self.count > 1

            def split(self):
                if self.count <= 1:
                    return None

                lowCount = self.count / 2
                highCount = self.count - lowCount

                return (
                    Generator(self.start, lowCount, self.increment),
                    Generator(self.start + self.increment * lowCount, highCount, self.increment)
                    )

            def map(self, f):
                return Generator.__pyfora_builtins__.MappingGenerator(self, f)

            def filter(self, f):
                return Generator.__pyfora_builtins__.FilteringGenerator(self, f)

            def nest(self, subgeneratorFun):
                return Generator.__pyfora_builtins__.NestedGenerator(self, subgeneratorFun)


        return Generator(self.start, self.count, self.increment)

class XRange:
    def __call__(self, first, second=None, increment=None):
        start = 0
        stop = 0
        if second is None:
            stop = first
        else:
            start = first
            stop = second

        if increment is None:
            increment = 1

        if increment == 0:
            raise ValueError("xrange() arg 3 must not be zero")

        if increment > 0:
            count = max(0, (stop - start - 1) / increment + 1)
        else:
            count = max(0, (start - stop - 1) / (-increment) + 1 )

        return XRangeInstance(start, count, increment)

class Sum:
    def __call__(self, sequence, start=0):
        #get a generator
        generator = sequence.__pyfora_generator__()

        class Empty:
            pass

        def sum(sumSubGenerator, depth):
            if depth > 9 or not sumSubGenerator.canSplit():
                result = Empty

                if sumSubGenerator.isNestedGenerator():
                    #the outer generator might not be splittable anymore, but
                    #the inner ones might
                    for childGenerator in sumSubGenerator.childGenerators():
                        if result is Empty:
                            result = sum(childGenerator, depth+1)
                        else:
                            result = result + sum(childGenerator, depth+1)
                else:
                    for val in sumSubGenerator:
                        if result is Empty:
                            result = val
                        else:
                            result = result + val
                return result
            else:
                split = sumSubGenerator.split()
                left = sum(split[0], depth+1)
                right = sum(split[1], depth+1)

                if left is Empty:
                    return right
                if right is Empty:
                    return left
                return left+right

        result = sum(generator, 0)

        if result is Empty:
            return start

        return start + result

class Reversed:
    def __call__(self, arr):
        l = len(arr)
        for idx in range(l):
            v = arr[l - idx - 1]
            yield v

class Abs:
    def __call__(self, val):
        return val.__abs__()

class All:
    def __call__(self, iterable):
        if len(iterable) == 0:
            return True
        for i in iterable:
            if not i:
                return False
        return True

class Ord:
    def __call__(self, character):        
        # assert we're getting a character of length 1
        if len(character) != 1:
            raise TypeError("ord() expected a character")

        return character.__pyfora_ord__()
        
class Chr:
    def __call__(self, asciiValue):
        return asciiValue.__pyfora_chr__()

class Max:
    def __call__(self, a,b):
        if a<b:
            return b
        return a

class Min:
    def __call__(self, a,b):
        if a<b:
            return a
        return b

class Reduce:
    def __call__(self, f, arr):
        toReturn = arr[0]
        idx = 0
        for a in arr:
            if idx != 0:
                toReturn = f(toReturn, a)
            idx = idx + 1
        return toReturn

mappings_ = [
    (len, Len), 
    (range, Range), 
    (xrange, XRange), 
    (sum, Sum),
    (abs, Abs), 
    (all, All),
    (ord, Ord),
    (chr, Chr),
    (max, Max),
    (min, Min),
    (reversed, Reversed),
    (reduce, Reduce)
    ]

def generateMappings():
	return [PureImplementationMapping.InstanceMapping(instance, pureType) for (instance, pureType) in mappings_]

