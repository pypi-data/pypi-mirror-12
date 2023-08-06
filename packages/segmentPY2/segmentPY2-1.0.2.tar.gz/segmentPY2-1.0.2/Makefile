CC=g++ 
CP=/bin/cp -f
RM=/bin/rm -f
MV=/bin/mv -f
MKDIR=/bin/mkdir -p

TARGET=segmentPY.so
INCLUDES=-I/usr/include/python2.6 -I../segment/
LIBS=-L./
SRC_SEGMENT=../segment/WordData.cpp ../segment/DATrieDict.cpp ../segment/WordSplit.cpp ../segment/WordSplitter.cpp

all: $(TARGET)
$(TARGET):
	$(CC) -fpic -c $(INCLUDES) segmentPY.cpp 
	$(CC) -shared -lsegment -o $(TARGET) segmentPY.o -L/usr/local/lib/ -L/usr/lib

test:
	g++ -g $(SRC_SEGMENT) segmentPY.cpp -shared -D_FILE_OFFSET_BITS=64 -o $(TARGET) -O2 -L/usr/local/lib/ -lpthread -I/usr/local/include -fPIC $(INCLUDES)

.PHONY: clean
clean:
	$(RM) *.o $(TARGET)
