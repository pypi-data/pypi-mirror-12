===========================================
filterediterator Library
===========================================

The filteredIterator library implements the FilteredIterator class. This class provides a iterator wrap, which can be initialised from any other iterator, Iterable or sequence, and provides easy to use chained filtering methods


*filterediterator*.FilteredIterator( *source iterable* )
--------------------------------------------------------
Initialises the FilteredIterator wrap around the source iterable. On it's own there is no benefit to placing the Filter wrap around an existing iterable.


*FilteredIterator*.filter( *predicate* )
----------------------------------------
returns a modified Iterator which is filtered based on the predicate. The predicate is a callable which is passed the data item from the iterator. The item is retained in the iterator if and only if the predicate callable returns True for that item.

*FilteredIterator*.dropwhile( *predicate* )
-------------------------------------------
returns a modified Iterator which is filtered based on the predicate. The predicate is a callable which is passed the data item from the iterator. The items are removed from the iterator while the predicate callable returns True. Once the predicate returns True, no future items are removed by dropwhile.

*FilteredIterator*.takewhile( *predicate* )
-------------------------------------------
returns a modified Iterator which is filtered based on the predicate. The predicate is a callable which is passed the data item from the iterator. The items are retained in the iterator while the predicate callable returns True. Once the predicate returns False, the iterator Stops.

Chaining methods
----------------
All of the above methods return a FilteredIterator instance, and therefore can be chained together to create complex filters as required.