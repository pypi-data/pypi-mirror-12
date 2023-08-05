/* File: lcdwrapper.i */
%module pylogilcd

%{
#define SWIG_FILE_WITH_INIT
#include "LogiLcd.h"
#include "LogitechLcd.h"
#include "surface.h"
#include "graphics.h"
#include <vector>
%}


%include "std_vector.i"
%include "std_string.i"

namespace std {
    %template(VectorInt) vector<int>;
};

const int LCD_WIDTH;
const int LCD_HEIGHT;

class surface
{
public:
    surface(int filler=0, int w=LCD_WIDTH, int h=LCD_HEIGHT);
    surface(std::vector<int> Bytearray, int filler=0, int w=LCD_WIDTH, int h=LCD_HEIGHT);
    void blitz(surface* surface_, int x=0, int y=0, bool overwrite=true);
    void invert();
    surface* split(int w, int h, int x=0, int y=0);
    void split(surface*, int x=0, int y=0);
    int getpixel(int x, int y);
    void setpixel(int x, int y, int val);
    int getwidth() const;
    int getheight() const;
};

class bitmapfont
{
public:
    bitmapfont(char* fname, int charw, int charh, int charpr, std::string charrefs);
    surface* getcharsurface(char ichar);
    surface* getstringsurface(std::string string_);
};

class app {
public:
    app(char* Appname);
    ~app();
    void update(surface& surface);
    void update();
    bool getbuttonpressed(int button);
};
