/*****************************
* Colibri Core
*   by Maarten van Gompel
*   Centre for Language Studies
*   Radboud University Nijmegen
*
*   http://proycon.github.io/colibri-core
*   
*   Licensed under GPLv3
*****************************/
#include <fstream>
#include <iostream>
#include <string>
#include <cmath>
#include <algorithms.h>
#include <common.h>
#include <getopt.h>
#include <patternmodel.h>
#include <config.h>

using namespace std;



void usage() {
    cerr << "Colibri Core " << VERSION << " - Pattern Modeller" << endl;
    cerr << "  by Maarten van Gompel, Language Machines, Centre for Language Studies, Radboud University Nijmegen" << endl;
    cerr << "  https://proycon.github.io/colibri-core" << endl << endl;
    cerr << "Syntax: colibri-patternmodeller [options]" << endl << endl;
    cerr << "Description: Extract, model and compare recurring patterns (n-grams, skipgrams, flexgrams) and their frequencies in text corpus data." << endl << endl;
    cerr << "Input/output options:" << endl;
    cerr << "\t-i [modelfile]   Input model" << endl;
    cerr << "\t-o [modelfile]   Output model" << endl;
    cerr << "\t-f [datafile]    Corpus data file (encoded from plain text or other sources with colibri-classencode)" << endl;
    cerr << "\t-c [classfile]   Class file (created with colibri-classencode)"<< endl;
    cerr << "\t-j [modelfile]   Joined input model, i.e. constraint model/training model. Result will be the *intersection* of this (training) model and the input model or constructed model." << endl;
    cerr << endl;
    cerr << " Building a model:  colibri-patternmodeller -o [modelfile] -f [datafile] -c [classfile]" << endl;
    cerr << "\t-2               Enable two-stage building (for indexed models), takes longer but saves a lot of memory on large corpora! First builds an unindexed model and reuses that (via -I) to" << endl;
    cerr << "\t                 build an indexed model (View options are ignored in two-stage building, whereas an output model (-o) is mandatory)" << endl;    
    cerr << "\t-t <number>      Occurrence threshold: patterns occuring less than this will be pruned (default: 2)" << endl;    
    cerr << "\t-u               Build an unindexed model (default is indexed)" << endl;    
    cerr << "\t-M               Build a patternpointer model instead of a normal pattern model, saves memory when thresholds are low" << endl;    
    cerr << "\t-m <number>      Minimum pattern length (default: 1)" << endl;
    cerr << "\t-l <number>      Maximum pattern length (default: 100)" << endl;
    cerr << "\t-b <number>      Maximum back-off length (default: 100). Only makes sense to set lower than minimum pattern length and may conserve memory during training then" << endl;
    cerr << "\t-W <number>      Word occurrence threshold (secondary threshold): only count patterns in which the words/unigrams occur at least this many times, only effective when the primary " << endl;
    cerr << "\t                 occurrence threshold (-t) is lower than this threshold (default: disabled)" << endl;    
    cerr << "\t-p <number>      Prune all lower-order n-grams below the specified order that are *NOT* subsumed by higher order n-grams (default: 0, disabled). Only effective when used with -l, usually set to equal values" << endl;
    cerr << "\t-s               Compute skipgrams (costs extra memory and time)" << endl;    
    cerr << "\t-y <number>      Occurrence threshold for skipgrams (overrides -t for skipgrams, defaults to -t). Skipgrams occurring less than this will be pruned. Value must be equal to or higher than -t." << endl;    
    cerr << "\t-T <number>      Skip type threshold (for use with -s): only skipgrams with at least x possible types for the skip will be considered, otherwise the skipgram " << endl;
    cerr << "\t                 will be pruned  (default: 2, unindexed models always act as if fixed to 1). Also note that only types that occur above the occurrent threshold (-t) are counted here! Requires indexed models" << endl;
    cerr << "\t-S S             Compute flexgrams by abstracting over skipgrams (implies -s)." << endl; 
    cerr << "\t-S <number>      Compute flexgrams (of type X {*} Y only) by using co-occurrence information. The number is the normalised pointwise information threshold above which to form skipgrams. Only for indexed models." << endl; 
    cerr << "\t-L               Input data file (-f) is a list of one pattern per line. No subgrams will be stored, implies -t 1" <<endl;
    cerr << "\t-I               Builds a new model from an input model (-i) and corpus data (-f).  Only patterns present in the input model will be present in the final model, making" << endl;
    cerr << "\t                 the input model the training model and the corpus data the test data. This method uses memory-efficient in-place building, and does not hold " << endl;
    cerr << "\t                 two models (unlike -j). Input model (-i) and or output model (-o) may be indexed or unindexed (-u), this option also allows for constructing indexed models " << endl;
    cerr << "\t                 from unindexed models (given the same source corpus), and is used in two-stage building (-2)." <<endl;  
    cerr << "\t--ssr            Perform Statistical Substring reduction, prunes n-grams that are only part of larger n-grams (TO BE IMPLEMENTED STILL)" << endl; //TODO
    cerr << "\t-E               Expand the loaded pattern model *ON THE SAME CORPUS DATA*, allows you to add, for example, larger order ngrams to an existing model or skipgrams to an n-gram only model." << endl;
    cerr << "\t-e <number>      Expand the loaded pattern model *ON DIFFERENT CORPUS DATA*, the number is the sentence offset to use in the model (be careful not to overlap with existing sentence indices!)." << endl;
    cerr << "\t                 The offset is only relevant for indexed models, for unindexed models any value will do." << endl;
    cerr << endl;
    cerr << " Building a model constrained by another model:  patternmodeller -o [modelfile] -j [trainingmodel] -f [datafile] -c [classfile]" << endl;
    cerr << endl;
    cerr << " Viewing a model:  colibri-patternmodeller -i [modelfile] -f [datafile] -c [classfile] -[PRHQ]" << endl;
    cerr << "\t-P               Print the entire model" << endl;
    cerr << "\t-R               Generate a (statistical/coverage) report" << endl;
    cerr << "\t-H               Generate a histogram" << endl;   
    cerr << "\t-V               Storage information" << endl;   
    cerr << "\t-Q               Start interactive query mode, allows for pattern lookup against the loaded model (input from standard input)" << endl; 
    cerr << "\t-Z               Print the reverse index (indexed models only)" << endl;
    cerr << "\t-q               Query a pattern (may be specified multiple times!)" << endl; 
    cerr << "\t-g               Compute and show relationships for the specified patterns (use with -q or -Q). Relationships are: subsumptions, neigbours, skipcontent. Only for indexed models." << endl; 
    cerr << "\t-C <threshold>   Compute and show absolute co-occurrence counts above the specified threshold.. Only for indexed models." << endl;
    cerr << "\t-Y <threshold>   Compute and show normalised pointwise mutual information co-occurrence  above the specified threshold [-1,1]. Only for indexed models." << endl;
    //cerr << "\t-G               Output relationship graph in graphviz format (use with -q)" << endl; 
    cerr << "\tOptions -tlT can be used to further filter the model" << endl;
    cerr << endl;
    cerr << " Editing a model:  colibri-patternmodeller -o [modelfile] -i [modelfile]" << endl;
    cerr << "\t-x               Delete all skipgrams from the model" << endl;    
    cerr << "\t-X               Delete all flexgrams from the model" << endl;    
    cerr << "\t-N               Delete all ngrams from the model" << endl;    
    cerr << "\tOptions -tlTmxXN can be used to filter the model, -u can be used to remove the index, -j can be used to take the intersection with another model, -S to compute and add flexgrams" << endl;
    cerr << endl;
    cerr << " Other options:" << endl;
    cerr << "\t-h               This help message" << endl;
    cerr << "\t-v               Version information" << endl;
    cerr << "\t-D               Enable debug mode" << endl;
}



template<class ModelType = IndexedPatternModel<>>
void processquerypattern(ModelType & model, ClassDecoder * classdecoder, const Pattern & pattern, bool dorelations) {
    if (!model.has(pattern)) {
        cout << "PATTERN \"" << pattern.tostring(*classdecoder) << "\" NOT FOUND IN MODEL" << endl;
    } else {
        model.print(&cout, *classdecoder, pattern);
        if (dorelations) model.outputrelations(pattern, *classdecoder, &cout);
    }
}

template<class ModelType = IndexedPatternModel<>>
void processquerypatterns(ModelType & model, ClassEncoder * classencoder, ClassDecoder * classdecoder, const vector<string> & querypatterns, bool dorelations) {
    cerr << "Processing " << querypatterns.size() << " queries" << endl;
    const bool allowunknown = true;
    unsigned char buffer[65536];
    for (vector<string>::const_iterator iter = querypatterns.begin(); iter != querypatterns.end(); iter++) {
       const string s = *iter;
       const int buffersize = classencoder->encodestring(s, buffer, allowunknown); 
       const Pattern pattern = Pattern(buffer, buffersize);
       processquerypattern<ModelType>(model,classdecoder,pattern, dorelations);
    }
}


template<class ModelType = IndexedPatternModel<>>
void querymodel(ModelType & model, ClassEncoder * classencoder, ClassDecoder * classdecoder, bool dorelations, bool repeat = true) {
    const bool allowunknown = true;
    unsigned char buffer[65536];
    uint32_t linenum = 0;
    std::string line;
    cerr << "Colibri Patternmodeller -- Interactive query mode." << endl;
    cerr << "  Type ctrl-D to quit, type X to switch between exact mode and extensive mode (default: extensive mode)." << endl;
    bool exact = false;
    do {
            linenum++;
            cerr << linenum << ">> "; 
            getline(cin,line);            
            if ((line == "X") || (line == "X\n")) {
                exact = !exact;
                if (exact) {
                    cerr << "Switched to Exact mode - Only exact matches will be shown now" << endl;
                } else {
                    cerr << "Switched to Extensive mode - Input will be scanned for all matching patterns" << endl;
                }
            } else if (!line.empty()) {
                const int buffersize = classencoder->encodestring(line, buffer, allowunknown); 
                Pattern linepattern = Pattern(buffer, buffersize);
                if (exact) { 
                    processquerypattern<ModelType>(model,classdecoder, linepattern, dorelations);
                } else {
                    vector<pair<Pattern, int> > patterns = model.getpatterns(linepattern);
                    if (model.has(linepattern)) {
                        const IndexReference ref = IndexReference(linenum,0);

                        //process and output instance
                        cout << ref.sentence << ':' << (int) ref.token << "\t";
                        processquerypattern<ModelType>(model, classdecoder, linepattern, dorelations);                                
                    }
                    for (vector<pair<Pattern,int> >::iterator iter = patterns.begin(); iter != patterns.end(); iter++) {
                            const Pattern pattern = iter->first;
                            const IndexReference ref = IndexReference(linenum,iter->second);

                            //process and output instance
                            cout << ref.sentence << ':' << (int) ref.token << "\t";
                            processquerypattern<ModelType>(model, classdecoder, pattern, dorelations);                                
                    } 
                }
            }
    } while (!cin.eof() && (repeat)); 
}


void assert_file_exists(const string & filename) {
    ifstream testf(filename);
    if (!testf.good()) {
        cerr << "No such file: " << filename << endl;
        exit(2);
    }
}


template<class ModelType = IndexedPatternModel<>>
void viewmodel(ModelType & model, ClassDecoder * classdecoder,  ClassEncoder * classencoder, bool print, bool report,  bool histogram , bool query, bool relations, bool info, bool printreverseindex, int cooc, double coocthreshold = 0.1) {
    cerr << "Generating desired views..." << endl;

    if (print) {
        if (classdecoder == NULL) {
            cerr << "ERROR: Unable to print model, no class file specified (-c)" << endl;
        } else {
            model.print(&cout, *classdecoder);
        }
    }
    if (printreverseindex) {
        model.printreverseindex(&cout, *classdecoder);
    }
    if (report) {
        model.report(&cout);
    }
    if (histogram) {
        model.histogram(&cout);
    }
    if (cooc == 2) {
        model.outputcooc_npmi(&cout, *classdecoder,coocthreshold);
    } else if (cooc == 1) {
        model.outputcooc(&cout, *classdecoder,coocthreshold);
    }

    if (query) {
        if (classencoder == NULL) {
            cerr << "ERROR: Unable to query model, no class encoder specified (-c)" << endl;
        } else {
            querymodel<ModelType>(model, classencoder, classdecoder, relations); 
        }
    }
    if (info) {
        model.info(&cout);
    }
}

template<class ModelType>
bool processmodel(const string & inputmodelfile, int inputmodeltype, const string & outputmodelfile, int outputmodeltype, const string & corpusfile,   PatternSetModel * constrainbymodel, IndexedCorpus * corpus, PatternModelOptions & options, bool continued, bool expand, int firstsentence, bool ignoreerrors, string inputmodelfile2, ClassDecoder * classdecoder,  ClassEncoder * classencoder, bool print, bool report,  bool histogram , bool query, bool relations, bool info, bool printreverseindex, int cooc, double coocthreshold, bool flexfromskip, const vector<string> & querypatterns) {
        if (!(print || report || histogram || query || info || cooc || printreverseindex || (!querypatterns.empty()) || (!outputmodelfile.empty()) )) {
            cerr << "Ooops... You didn't really give me anything to do...that can't be right.. Please study the usage options (-h) again! Did you perhaps forget a -P or -o? " << endl;
            return false;
        }
    
        ModelType * inputmodel;

        string outputqualifier = "";
        if ((outputmodeltype == UNINDEXEDPATTERNMODEL) || (outputmodeltype == UNINDEXEDPATTERNPOINTERMODEL)) {
            outputqualifier += " unindexed";
        }
        if ((outputmodeltype == INDEXEDPATTERNPOINTERMODEL) || (outputmodeltype == UNINDEXEDPATTERNPOINTERMODEL)) {
            outputqualifier += " pointer";
        }

        if (inputmodelfile.empty()) {
            //train model from scratch

            inputmodel = new ModelType(corpus);


            cerr << "Training" << outputqualifier << " model on  " << corpusfile <<endl;
            inputmodel->train(corpusfile, options, constrainbymodel, continued,firstsentence,ignoreerrors);
            if (constrainbymodel) {
                cerr << "Unloading constraint model" << endl;
                delete constrainbymodel;
                constrainbymodel = NULL;
            }
           
            if (options.DOSKIPGRAMS) {
                if ((inputmodeltype == UNINDEXEDPATTERNMODEL) || (inputmodeltype == UNINDEXEDPATTERNPOINTERMODEL)) {
                    cerr << "WARNING: Can't compute skipgrams non-exhaustively on unindexed model" << endl;
                    if (flexfromskip) cerr << "WARNING: Can't compute flexgrams from skipgrams on unindexed model" << endl;
                }  else {
                    if (!inputmodelfile2.empty()) cerr << "WARNING: Can not compute skipgrams constrained by " << inputmodelfile2 << "!" << endl;
                    if (!inputmodel->hasskipgrams) {
                        cerr << "Computing skipgrams" << endl;
                        inputmodel->trainskipgrams(options);
                    }
                    if (flexfromskip) {
                        cerr << "Computing flexgrams from skipgrams" << corpusfile <<endl;
                        int found = inputmodel->computeflexgrams_fromskipgrams();
                        cerr << found << " flexgrams found" << corpusfile <<endl;
                    }
                }
            }

        } else {
            //load model

            cerr << "Loading pattern model " << inputmodelfile << " as" << outputqualifier << " model..."<<endl;
            inputmodel = new ModelType(inputmodelfile, options, (PatternModelInterface*) constrainbymodel, corpus);
            if ((corpus != NULL) && (inputmodel->hasskipgrams)) {
                cerr << "Filtering skipgrams..." << endl;
                inputmodel->pruneskipgrams(options.MINTOKENS, options.MINSKIPTYPES);
            }

            if ((!corpusfile.empty()) && (expand)) {
                cerr << "Expanding model on  " << corpusfile <<endl;
                inputmodel->train(corpusfile, options, constrainbymodel, continued,firstsentence,ignoreerrors);
                if (constrainbymodel) {
                    cerr << "Unloading constraint model" << endl;
                    delete constrainbymodel;
                    constrainbymodel = NULL;
                }
            } else if (options.DOSKIPGRAMS) {
                if (constrainbymodel) {
                    cerr << "Unloading constraint model" << endl;
                    delete constrainbymodel;
                    constrainbymodel = NULL;
                }
                cerr << "Computing skipgrams" << endl;
                if (!inputmodelfile2.empty()) cerr << "WARNING: Can not compute skipgrams constrained by " << inputmodelfile2 << "!" << endl;
                inputmodel->trainskipgrams(options);
                if (flexfromskip) {
                    cerr << "Computing flexgrams from skipgrams" << corpusfile <<endl;
                    int found = inputmodel->computeflexgrams_fromskipgrams();
                    cerr << found << " flexgrams found" << corpusfile <<endl;
                }
            } else {
                if (constrainbymodel) {
                    cerr << "Unloading constraint model" << endl;
                    delete constrainbymodel;
                    constrainbymodel = NULL;
                }
            }
        }
        

        if (!outputmodelfile.empty()) {
            cerr << "Writing model to " << outputmodelfile << endl;
            inputmodel->write(outputmodelfile);
        }
        viewmodel<ModelType>(*inputmodel, classdecoder, classencoder, print, report, histogram, query, relations, info, printreverseindex, cooc, coocthreshold); 

        if (!querypatterns.empty()) {
            processquerypatterns<ModelType>(*inputmodel,  classencoder, classdecoder, querypatterns, relations);
        }

        delete inputmodel;

        return true;
}


int main( int argc, char *argv[] ) {
    
    string classfile = "";
    string inputmodelfile = "";
    string inputmodelfile2 = "";
    string outputmodelfile = "";
    string corpusfile = "";
    string reverseindexfile = "";
    

    string modelfile = "";
    string modelfile2 = "";
    string covviewfile = ""; //not used yet
   
    vector<string> querypatterns;
    
    
    PatternModelOptions options;

    bool LOADCORPUS = true; //load corpus/reverse index

    int outputmodeltype = INDEXEDPATTERNMODEL;
    bool DOQUERIER = false;
    bool DOREPORT = false;
    bool DOHISTOGRAM = false;
    bool DOPRINT = false;
    bool DOPRINTREVERSEINDEX = false;
    bool DORELATIONS = false;
    bool DOINFO = false;
    bool DOFLEXFROMSKIP = false;
    bool DOFLEXFROMCOOC = false;
    bool DOTWOSTAGE =false;
    bool DOINPLACEREBUILD = false;
    double COOCTHRESHOLD = 0;
    int DOCOOC = 0; //1= absolute, 2= npmi
    bool continued = false;
    bool expand = false; //on different data
    bool ignoreerrors = false;
    uint32_t firstsentence = 1;
    char c;    
    while ((c = getopt(argc, argv, "hc:i:j:o:f:t:ul:sT:PRHQDhq:r:gGS:xXNIVC:Y:L2Zm:vb:y:W:p:Ee:0M")) != -1)
        switch (c)
        {
        case 'c':
            classfile = optarg;
            break;
        case 'i':
            inputmodelfile = optarg;
            break;
        case 'j':
            inputmodelfile2 = optarg;
            break;
        case 'D':
            cerr << "(ENABLING DEBUG MODE)" << endl;
            options.DEBUG = true;
        	break;
        case 'R':
            DOREPORT = true;
            break;            
        case 'f':
            corpusfile = optarg;
            break;        
        case 't':
            options.MINTOKENS = atoi(optarg);
            break;
        case 'T':
            options.MINSKIPTYPES = atoi(optarg);            
            break;
        case 'y':
            options.MINTOKENS_SKIPGRAMS = atoi(optarg);
            break;
        case 'l':
            options.MAXLENGTH = atoi(optarg); 
            break;
        case 'm':
            options.MINLENGTH = atoi(optarg);            
            break;
        case 'b':
            options.MAXBACKOFFLENGTH = atoi(optarg);            
            break;
        case 'W':
            options.MINTOKENS_UNIGRAMS = atoi(optarg);
            break;
        case 'p':
            options.PRUNENONSUBSUMED = atoi(optarg);
            break;
        case 's':
            options.DOSKIPGRAMS = true;
            break;
        case '2':
            DOTWOSTAGE = true;
            break;
        case 'o': 
            outputmodelfile = optarg;
            break;
		case 'u':
            if (outputmodeltype == INDEXEDPATTERNMODEL) {
                outputmodeltype = UNINDEXEDPATTERNMODEL;
            } else {
                outputmodeltype = UNINDEXEDPATTERNPOINTERMODEL;
            }
			break;
        case 'M':
            if (outputmodeltype == INDEXEDPATTERNMODEL) {
                outputmodeltype = INDEXEDPATTERNPOINTERMODEL;
            } else {
                outputmodeltype = UNINDEXEDPATTERNPOINTERMODEL;
            }
			break;
		case 'r':
            //alias for -f , for backward compatibility
            corpusfile = optarg;
			break;
		case 'g':
            DORELATIONS = true;
			break;
		case 'Q':
			DOQUERIER = true;
			break;
        case 'q':
            querypatterns.push_back(optarg);
            break;
        case 'H':
            DOHISTOGRAM = true;
            break;        
        case 'P':
            DOPRINT = true;
            break;        
        case 'S':
            if (string(optarg) == "S") {
                DOFLEXFROMSKIP = true;
                options.DOSKIPGRAMS = true;
            } else {
                DOFLEXFROMCOOC = true;
                COOCTHRESHOLD = atof(optarg);
            }
            break;
        case 'Y':
            DOCOOC = 2; //npmi
            COOCTHRESHOLD = atof(optarg);
            break;
        case 'C':
            DOCOOC = 1;
            COOCTHRESHOLD = atof(optarg);
            break;
        case 'x':
            options.DOREMOVESKIPGRAMS = true;
            break;
        case 'X':
            options.DOREMOVEFLEXGRAMS = true;
            break;
        case 'N':
            options.DOREMOVENGRAMS = true;
            break;
        case 'L':
            options.DOPATTERNPERLINE = true;
            break;
        case 'I':
            DOINPLACEREBUILD = true;
            break;
        case 'V':
            DOINFO = true;
            break;
        case 'Z':
            DOPRINTREVERSEINDEX = true;
            break;
        case 'G':
            cerr << "Option -G NOT IMPLEMENTED YET!" << endl;
            exit(2);
        case 'E':
            continued = true;
            break;
        case 'e':
            firstsentence = atoi(optarg);
            expand = true;
            break;
        case 'h':
            usage();
            exit(0);
        case 'v':
            cerr << VERSION << endl; 
            exit(0);
        case '0':
            ignoreerrors = true;
            break;
        case '?':
            if (optopt == 'c') {
                cerr <<  "Option -" << optopt << " requires an argument." << endl;
            } else {
                cerr << "Unknown option: -" <<  optopt << endl;
            }
            
            return 1;
        default:
            cerr << "Unknown option: -" <<  optopt << endl;
            abort ();
        }
  

    int stages = 1;

    //cache options for two stage building (we will alter them)
    string cached_outputmodelfile = outputmodelfile;
    bool cached_DOSKIPGRAMS = options.DOSKIPGRAMS;
    bool cached_DOFLEXFROMCOOC = DOFLEXFROMCOOC;

    if (DOTWOSTAGE) {
       if (options.MINTOKENS == 1) {
           cerr << "Two stage building was requested but has no value with -t 1 , disabling..." << endl;
           DOTWOSTAGE = false;
       } else {
            stages = 2;
            if (outputmodelfile.empty()) {
                cerr << "ERROR: An output model file (-o) is mandatory for two-stage building!" << endl;
                exit(2);
            }
       }
    }


    for (int stage = 1; stage <= stages; stage++) {

        if (DOTWOSTAGE) {
            if (stage == 1) {
                cerr << "********* STARTING STAGE 1/2: Building intermediary unindexed patternmodel ******" << endl; 
                DOINPLACEREBUILD = false;
                outputmodelfile = outputmodelfile + ".stage1"; 
                outputmodeltype = UNINDEXEDPATTERNMODEL;
                DOPRINT = DORELATIONS = DOHISTOGRAM = DOQUERIER = DOINFO = false;
                options.DOSKIPGRAMS = false;
                DOFLEXFROMCOOC = false;
            } else if (stage == 2) {
                cerr << "********* STARTING STAGE 2/2: Building indexed patternmodel ******" << endl; 
                DOINPLACEREBUILD = true;
                //back to originals
                outputmodelfile = cached_outputmodelfile;
                outputmodeltype = INDEXEDPATTERNMODEL;
                options.DOSKIPGRAMS = cached_DOSKIPGRAMS;
                DOFLEXFROMCOOC = cached_DOFLEXFROMCOOC;
                inputmodelfile = outputmodelfile + ".stage1";
                inputmodelfile2 = "";
            }
        }


        if ((inputmodelfile.empty()) && (corpusfile.empty())) {
            if (argc <= 1) {
                usage();
                exit(0);
            } else {
                cerr << "ERROR: No input model (-i) or corpus data file specified (-f), specify at least one. Issue colibri-patternmodeller -h for extensive usage options" << classfile << endl;
                exit(2);
            }
        }

        if (options.DOPATTERNPERLINE) options.MINTOKENS = 1;

        ClassDecoder * classdecoder = NULL;
        ClassEncoder * classencoder = NULL;

        if (!classfile.empty()) {
            cerr << "Loading class decoder from file " << classfile << endl;
            classdecoder = new ClassDecoder(classfile);
            if ((DOQUERIER) || (!querypatterns.empty())) {
                cerr << "Loading class encoder from file " << classfile << endl;
                classencoder = new ClassEncoder(classfile);
            }
        }

        int inputmodeltype = -99;
        if (!inputmodelfile.empty()) {
            assert_file_exists(inputmodelfile);
            inputmodeltype = getmodeltype(inputmodelfile);
            if ((inputmodeltype == INDEXEDPATTERNMODEL) && (outputmodeltype == UNINDEXEDPATTERNMODEL))   {
                cerr << "NOTE: Indexed input model will be read as unindexed because -u was set" << endl;
            }
            if ( ((inputmodeltype == INDEXEDPATTERNMODEL) || (inputmodeltype == UNINDEXEDPATTERNMODEL)) && ((outputmodeltype == UNINDEXEDPATTERNPOINTERMODEL) || (outputmodeltype == INDEXEDPATTERNPOINTERMODEL)) ) {
                cerr << "ERROR: Input is a pattern model, can not load as a pattern pointer model!" << endl;
                exit(2);
            }
            if (  (!outputmodelfile.empty()) &&  ( ((outputmodeltype == INDEXEDPATTERNMODEL) || (outputmodeltype == UNINDEXEDPATTERNMODEL)) && ((inputmodeltype == UNINDEXEDPATTERNPOINTERMODEL) || (inputmodeltype == INDEXEDPATTERNPOINTERMODEL)) ) )  {
                cerr << "NOTE: Converting a pattern pointer model to a pattern model " << endl;
            }
        }
        

        //operations without input model
        PatternSetModel * constrainbymodel = NULL;
        PatternModelOptions constrainoptions = PatternModelOptions(options);
        constrainoptions.DOREMOVEINDEX = false;
        if (!inputmodelfile2.empty()) {
            cerr << "Loading constraint model (aka training/intersection model)" << endl;
            constrainbymodel = new PatternSetModel(inputmodelfile2, constrainoptions);
            cerr << " (Contains " << constrainbymodel->size() << " patterns)" << endl;
        }

        IndexedCorpus * corpus = NULL;

        if ( ((outputmodeltype == UNINDEXEDPATTERNMODEL) || (inputmodeltype == UNINDEXEDPATTERNMODEL) || (outputmodeltype == UNINDEXEDPATTERNPOINTERMODEL) || (inputmodeltype == UNINDEXEDPATTERNPOINTERMODEL))) {
            if (options.DOSKIPGRAMS) {
                cerr << "NOTE: Skipgram generation on unindexed pattern models can only be done exhaustively!" << endl;
                cerr << " This does not take the -T parameter into account (-T will always be 1), "<<endl;
                cerr << " generates lots of skipgrams, and is therefore far less memory efficient "<<endl;
                cerr << " than with indexed models." << endl;
                options.DOSKIPGRAMS_EXHAUSTIVE = true;
                options.DOSKIPGRAMS = false;
            } else {
                LOADCORPUS = false;
            }
        }

        if ((inputmodeltype != UNINDEXEDPATTERNPOINTERMODEL) && (inputmodeltype != INDEXEDPATTERNPOINTERMODEL)) {
            if (corpusfile.empty()) {
                if ((DOPRINTREVERSEINDEX) || (options.DOSKIPGRAMS) || (DOFLEXFROMSKIP) || (DORELATIONS) || (DOCOOC)) {
                    cerr << "ERROR: No corpus data file was specified (-f), but this is required for the options you specified..." << endl;
                    exit(2);
                }
            } else if (LOADCORPUS) {
                cerr << "Loading corpus data..." << endl;
                std::ifstream * f = new ifstream(corpusfile.c_str());
                if (!f->good()) {
                    cerr << "Can't open corpus data: " << corpusfile << endl;
                    exit(2);
                }
                corpus = new IndexedCorpus(f);
                f->close();
            }
        }
            

        if (DOINPLACEREBUILD) { ///*****************************************************
            cerr << "In-place rebuild (-I) enabled" << corpusfile <<endl;

            if ((inputmodeltype != UNINDEXEDPATTERNPOINTERMODEL) && (inputmodeltype != INDEXEDPATTERNPOINTERMODEL)) {
                if (corpusfile.empty()) {
                    cerr << "ERROR: Corpus data file (-f) must be specified when -I is set!." << classfile << endl;
                    exit(2);
                } else {
                    assert_file_exists(corpusfile);
                }
            }

            if (outputmodeltype == UNINDEXEDPATTERNMODEL) {
                cerr << "Loading model " << inputmodelfile << " as unindexed pattern model..."<<endl;
                PatternModelOptions optionscopy = PatternModelOptions(options);
                optionscopy.DORESET = true;
                PatternModel<uint32_t> model = PatternModel<uint32_t>(inputmodelfile, optionscopy, (PatternModelInterface*) constrainbymodel, corpus);
                cerr << "(" << model.size() << " patterns" << ")" << endl;

                if (constrainbymodel) {
                    cerr << "Unloading constraint model" << endl;
                    delete constrainbymodel;
                    constrainbymodel = NULL;
                }


                //build new model from corpus
                cerr << "Building new unindexed model from  " << corpusfile <<endl;
                model.train(corpusfile, options, model.getinterface(), continued,firstsentence,ignoreerrors);

                if (DOFLEXFROMSKIP) {
                    cerr << "Computing flexgrams from skipgrams" << corpusfile <<endl;
                    int found = model.computeflexgrams_fromskipgrams();
                    cerr << found << " flexgrams found" << corpusfile <<endl;
                }

                if (!outputmodelfile.empty()) {
                    model.write(outputmodelfile);
                }
                viewmodel<PatternModel<uint32_t>>(model, classdecoder, classencoder, DOPRINT, DOREPORT, DOHISTOGRAM, DOQUERIER, DORELATIONS, DOINFO, DOPRINTREVERSEINDEX, DOCOOC); 
            } else if (outputmodeltype == INDEXEDPATTERNMODEL) {
                cerr << "Loading model " << inputmodelfile << " as indexed pattern model..."<<endl;
                PatternModelOptions optionscopy = PatternModelOptions(options);
                optionscopy.DORESET = true;
                IndexedPatternModel<> model = IndexedPatternModel<>(inputmodelfile, optionscopy, (PatternModelInterface*) constrainbymodel, corpus);
                cerr << "(" << model.size() << " patterns" << ")" << endl;

                if (constrainbymodel) {
                    cerr << "Unloading constraint model" << endl;
                    delete constrainbymodel;
                    constrainbymodel = NULL;
                }
                //build new model from corpus
                cerr << "Building new indexed model from  " << corpusfile <<endl;
                model.train(corpusfile, options, model.getinterface(), continued, firstsentence,ignoreerrors);

                if (!outputmodelfile.empty()) {
                    model.write(outputmodelfile);
                }
                viewmodel<IndexedPatternModel<>>(model, classdecoder, classencoder, DOPRINT, DOREPORT, DOHISTOGRAM, DOQUERIER, DORELATIONS, DOINFO, DOPRINTREVERSEINDEX, DOCOOC, COOCTHRESHOLD); 
                if (!querypatterns.empty()) {
                    processquerypatterns<IndexedPatternModel<>>(model,  classencoder, classdecoder, querypatterns, DORELATIONS);
                }
            } ///*****************************************************



        } else { 
            if (outputmodeltype == INDEXEDPATTERNMODEL) {
                processmodel<IndexedPatternModel<>>(inputmodelfile, inputmodeltype,  outputmodelfile, outputmodeltype, corpusfile, constrainbymodel,  corpus, options, continued, expand, firstsentence,  ignoreerrors, inputmodelfile2, classdecoder,classencoder, DOPRINT, DOREPORT, DOHISTOGRAM, DOQUERIER, DORELATIONS, DOINFO, DOPRINTREVERSEINDEX, DOCOOC, COOCTHRESHOLD, DOFLEXFROMSKIP, querypatterns);
            } else if (outputmodeltype == INDEXEDPATTERNPOINTERMODEL) {
                processmodel<IndexedPatternPointerModel<>>(inputmodelfile, inputmodeltype,  outputmodelfile, outputmodeltype, corpusfile, constrainbymodel,  corpus, options, continued, expand, firstsentence,  ignoreerrors, inputmodelfile2, classdecoder,classencoder, DOPRINT, DOREPORT, DOHISTOGRAM, DOQUERIER, DORELATIONS, DOINFO, DOPRINTREVERSEINDEX, DOCOOC, COOCTHRESHOLD, DOFLEXFROMSKIP, querypatterns);
            } else if (outputmodeltype == UNINDEXEDPATTERNMODEL) {
                processmodel<PatternModel<uint32_t>>(inputmodelfile, inputmodeltype,  outputmodelfile, outputmodeltype, corpusfile, constrainbymodel,  corpus, options, continued, expand, firstsentence,  ignoreerrors, inputmodelfile2, classdecoder,classencoder, DOPRINT, DOREPORT, DOHISTOGRAM, DOQUERIER, DORELATIONS, DOINFO, DOPRINTREVERSEINDEX, DOCOOC, COOCTHRESHOLD, DOFLEXFROMSKIP, querypatterns);
            } else if (outputmodeltype == UNINDEXEDPATTERNPOINTERMODEL) {
                processmodel<PatternPointerModel<uint32_t>>(inputmodelfile, inputmodeltype,  outputmodelfile, outputmodeltype, corpusfile, constrainbymodel,  corpus, options, continued, expand, firstsentence,  ignoreerrors, inputmodelfile2, classdecoder,classencoder, DOPRINT, DOREPORT, DOHISTOGRAM, DOQUERIER, DORELATIONS, DOINFO, DOPRINTREVERSEINDEX, DOCOOC, COOCTHRESHOLD, DOFLEXFROMSKIP, querypatterns);
            }
        }

        if (corpus != NULL) delete corpus;
    }
}
