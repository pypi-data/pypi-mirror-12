/**
This code is part of the Arc-flow Vector Packing Solver (VPSolver).

Copyright (C) 2013-2015, Filipe Brandao
Faculdade de Ciencias, Universidade do Porto
Porto, Portugal. All rights reserved. E-mail: <fdabrandao@dcc.fc.up.pt>.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
**/
#ifndef _ARCFLOW_HPP_
#define _ARCFLOW_HPP_

#include <map>
#include <ctime>
#include <set>
#include <map>
#include <vector>
#include "graph.hpp"
#include "common.hpp"
#include "instance.hpp"
using namespace std;



class Arcflow{
private:
    set<Arc> AS;
    map<vector<int>, int> dp;
    int go(const vector<int> &su);
    inline vector<int> hash(const vector<int> &su);
    vector<int> max_label;
    vector<int> min_label;
    vector<vector<int> > ls_mat;
    int lsize;
protected:
    bool ready;
    clock_t tstart;
    bool binary;
    int ndims, m;
    vector<int> W;
    vector<Item> items;
    NodeSet NS;
    vector<Arc> A;

    vector<int> max_rep(const vector<int> &u, int i0, int sub_i0) const;
    void lift_state(vector<int> &u, int it, int ic) const;
    int knapsack(const vector<int> &b, int i0, int d, int C) const;
    bool is_valid(const vector<int> &u) const;
    bool is_compatible(const Item &a, const Item &b) const;
    void relabel_graph(const vector<int> &label);
    void build();
    void build_dp();
    void break_symmetry();
    void main_compression_step();
    void final_compression_step();
    void compress();
    void finalize();
public:
    Arcflow(const Instance &inst);
    void write(const char *fname);
    void write(FILE *fout);
};

#endif


