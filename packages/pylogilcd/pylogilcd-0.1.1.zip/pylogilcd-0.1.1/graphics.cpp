#include "graphics.h"
#include "windows.h"
#include "surface.h"

#include <string>
#include <vector>
#include <algorithm>
#include <iostream>
#include <fstream>

void readbmp(char* filename, unsigned char bmpdata[])
{
    std::ifstream fin(filename, std::ios::binary);
    fin.seekg(0, std::ios::beg);
    BmpSignature sig;
    BmpHeader header;
    fin.read((char*) &sig, sizeof(sig));
    fin.read((char*) &header, sizeof(header));
    unsigned int datasize = header.fileSize-header.dataOffset;
    fin.seekg(header.dataOffset);
    fin.read((char*) bmpdata, datasize);
    fin.close();
}

BmpHeader readbmpheader(char* filename)
{
    std::ifstream fin(filename, std::ios::binary);
    fin.seekg(0, std::ios::beg);
    BmpSignature sig;
    BmpHeader header;
    fin.read((char*) &sig, sizeof(sig));
    fin.read((char*) &header, sizeof(header));
    fin.seekg(header.dataOffset);
    fin.close();
    return header;
}

BmpHeader::BmpHeader()
    : fileSize(0),
      reserved1(0),
      reserved2(0),
      dataOffset(0) { }

BmpSignature::BmpSignature() {
    data[0] = data[1] = 0;
    }

fontchar::fontchar(surface* surface_, const int w_, const int h_)
    : w(w_),
      h(h_)
{
   charsurface = surface_;
}

surface* fontchar::getcharsurface() {
    return charsurface;
}

int fontchar::getwidth() {
    return w;
}

int fontchar::getheight() {
    return h;
}

int bitmapfont::getcharindex(char ichar)
{
    std::string::size_type index = charref.find_first_of(ichar);
    if (index != std::string::npos)
    {
        return index;
    }
    return 0;
}

surface* bitmapfont::getcharsurface(char ichar)
{
    int index = getcharindex(ichar);
    return charlist[index]->getcharsurface();
}

surface* bitmapfont::getstringsurface(std::string string_)
{
    surface* totalstringsurface = new surface(0, 1, charheight);
    surface* subsurface;
    surface* newsurface;
    int newwidth;
    std::string::iterator it;
    for (it = string_.begin(); it != string_.end(); ++it)
    {
        int index = std::distance(string_.begin(), it);
        subsurface = getcharsurface(*it);
        if (index == 0)
        {
            totalstringsurface = subsurface;
        }
        else
        {
            newwidth = totalstringsurface->getwidth() + subsurface->getwidth();
            newsurface = new surface(0, newwidth, charheight);
            newsurface->blitz(totalstringsurface, 0, 0);
            newsurface->blitz(subsurface, totalstringsurface->getwidth(), 0);
            totalstringsurface = newsurface;
        }
    }
    return totalstringsurface;
}

void surfacefromBMP(unsigned char BMPdata[], surface* surface_)
{
    for (int i=0; i<surface_->getwidth()*surface_->getheight(); i++)
    {
        int val_ = (int)BMPdata[i];
        surface_->setpixel(i%surface_->getwidth(), surface_->getheight()-i/surface_->getwidth(), 255-val_);
    }
}

bitmapfont::bitmapfont(char* fname, int charw, int charh, int charpr, std::string charrefs)
    : filename(fname),
      charwidth(charw),
      charheight(charh),
      charperrow(charpr),
      charref(charrefs),
      spacewidth(charwidth),
      srcwidth(charwidth*charperrow),
      srcheight((charref.size()/charperrow+1)*charheight)
{
    BmpHeader header = readbmpheader((char*)filename);
    unsigned char bmpdata[header.fileSize-header.dataOffset];
    readbmp((char*)filename, bmpdata);
    surface* fontsurface_ = new surface(0, srcwidth, srcheight);
    surface* charsurface;
    fontchar* pchar;
    surfacefromBMP(bmpdata, fontsurface_);
    totalcharcount = charref.size();
    for (int i=0; i<totalcharcount; i++)
    {
        charsurface = new surface(0, charwidth, charheight);
        fontsurface_->split(charsurface, i%charperrow * charwidth,
                                         i/charperrow * charheight);

        pchar = new fontchar(charsurface, charwidth, charheight);
        charlist.push_back(pchar);
    }
}


