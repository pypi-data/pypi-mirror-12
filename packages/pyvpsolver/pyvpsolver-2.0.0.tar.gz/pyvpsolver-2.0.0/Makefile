SRC = src
BIN = bin
CC=g++
CFLAGS= -Wall -O2

GUROBI_DIR = /opt/gurobi602/linux64
CLIB     = -L$(GUROBI_DIR)/lib/ -lgurobi60
INC      = $(GUROBI_DIR)/include/
CPPLIB   = -L$(GUROBI_DIR)/lib/ -lgurobi_c++ $(CLIB)
GUROBI_OPTS = -I$(INC) $(CPPLIB) -lpthread

GLPK_OPTS = -lglpk

all: $(BIN)/vpsolver $(BIN)/vbp2afg $(BIN)/afg2mps $(BIN)/afg2lp $(BIN)/solve_gurobi $(BIN)/solve_glpk $(BIN)/vbpsol $(BIN)/gg_afg

$(BIN)/vpsolver: $(SRC)/vpsolver.cpp $(SRC)/instance.cpp $(SRC)/graph.cpp $(SRC)/arcflow.cpp $(SRC)/arcflowsol.cpp
	$(CC) -o $(BIN)/vpsolver $(CFLAGS) $(SRC)/vpsolver.cpp $(SRC)/instance.cpp $(SRC)/graph.cpp $(SRC)/arcflow.cpp $(SRC)/arcflowsol.cpp $(GUROBI_OPTS)

$(BIN)/vbp2afg: $(SRC)/vbp2afg.cpp $(SRC)/instance.cpp $(SRC)/graph.cpp $(SRC)/arcflow.cpp
	$(CC) -o $(BIN)/vbp2afg $(CFLAGS) $(SRC)/vbp2afg.cpp $(SRC)/instance.cpp $(SRC)/graph.cpp $(SRC)/arcflow.cpp

$(BIN)/afg2mps: $(SRC)/afg2mps.cpp $(SRC)/instance.cpp $(SRC)/graph.cpp $(SRC)/arcflow.cpp
	$(CC) -o $(BIN)/afg2mps $(CFLAGS) $(SRC)/afg2mps.cpp $(SRC)/instance.cpp $(SRC)/graph.cpp $(SRC)/arcflow.cpp

$(BIN)/afg2lp: $(SRC)/afg2lp.cpp $(SRC)/instance.cpp $(SRC)/graph.cpp $(SRC)/arcflow.cpp
	$(CC) -o $(BIN)/afg2lp $(CFLAGS) $(SRC)/afg2lp.cpp $(SRC)/instance.cpp $(SRC)/graph.cpp $(SRC)/arcflow.cpp

$(BIN)/solve_gurobi: $(SRC)/solve_gurobi.cpp
	$(CC) -o $(BIN)/solve_gurobi $(CFLAGS) $(SRC)/solve_gurobi.cpp $(GUROBI_OPTS)

$(BIN)/solve_glpk: $(SRC)/solve_glpk.cpp
	$(CC) -o $(BIN)/solve_glpk $(CFLAGS) $(SRC)/solve_glpk.cpp $(GLPK_OPTS)

$(BIN)/vbpsol: $(SRC)/vbpsol.cpp $(SRC)/instance.cpp $(SRC)/graph.cpp $(SRC)/arcflow.cpp $(SRC)/arcflowsol.cpp
	$(CC) -o $(BIN)/vbpsol $(CFLAGS) $(SRC)/vbpsol.cpp $(SRC)/instance.cpp $(SRC)/graph.cpp $(SRC)/arcflow.cpp $(SRC)/arcflowsol.cpp

$(BIN)/gg_afg: $(SRC)/gg_afg.cpp $(SRC)/instance.cpp $(SRC)/graph.cpp $(SRC)/arcflow.cpp
	$(CC) -o $(BIN)/gg_afg $(CFLAGS) $(SRC)/gg_afg.cpp $(SRC)/instance.cpp  $(SRC)/graph.cpp $(SRC)/arcflow.cpp  $(GUROBI_OPTS)

clean:
	rm -rf $(BIN)/*
