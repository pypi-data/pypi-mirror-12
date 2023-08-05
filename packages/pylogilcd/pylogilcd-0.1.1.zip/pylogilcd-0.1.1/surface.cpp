#include "surface.h"
#include <vector>
#include <iostream>

surface::surface(int filler, const int w, const int h)
    : sizewidth(w),
      sizeheight(h)
{
    for (int width=0; width<w; width++)
    {
        for (int height=0; height<h; height++)
        {
            bgdata.push_back(filler);
        }
    }
}
surface::surface(std::vector<int> Bytearray, int filler,int w,int h)
    : sizewidth(w),
      sizeheight(h)
{
    int inputsize = Bytearray.size();
    int sizeleft = w*h - inputsize;
    for (int i=0; i<inputsize; i++)
    {
        bgdata.push_back((BYTE)Bytearray[i]);
    }
    for (int i=0; i<sizeleft; i++)
    {
        bgdata.push_back(filler);
    }
}

//surface::surface(const surface &surface_)
//    : sizewidth(surface_.getwidth()),
//      sizeheight(surface_.getheight())
//{
//
//}

surface::~surface() {

}

int surface::getpixel(int x, int y)
{
    int n = getwidth() * y + x;
    return bgdata[n];
}

void surface::setpixel(int x, int y, int val)
{
    int n = getwidth() * y + x;
    bgdata[n] = val;
}

void surface::blitz(surface* surface_, int x, int y, bool overwrite)
{
    for (int i=0; i<surface_->getwidth()*surface_->getheight(); i++)
    {
        int x_ = i % surface_->getwidth();
        int y_ = i / surface_->getwidth();
        int val_ = surface_->getpixel(x_, y_);
        x_ += x;
        y_ += y;
        if (x_>=0 && x_<getwidth() && y_>=0 && y_<getheight())
        {
            if (overwrite || val_>128) {
                setpixel(x_, y_, val_);
            }
        }
    }
}

surface* surface::split(const int w, const int h, const int x, const int y)
{
    surface* newsurface = new surface(0, w, h);
    for (int i=0; i<w*h; i++)
    {
        int x_ = x + i % w;
        int y_ = y + i / w;
        int val_ = 0;
        if (x_>=0 && x_<getwidth() && y_>=0 && y<getheight())
        {
            val_ = getpixel(x_, y_);
        }
        newsurface->setpixel(i % w, i / w, val_);
    }
    return newsurface;
}

void surface::split(surface* surface_, int x, int y)
{
    for (int i=0; i<surface_->getwidth()*surface_->getheight(); i++)
    {
        int x_ = x + i % surface_->getwidth();
        int y_ = y + i / surface_->getwidth();
        int val_ = 0;
        if (x_>=0 && x_<getwidth() && y_>=0 && y<getheight())
        {
            val_ = getpixel(x_, y_);
        }
        surface_->setpixel(i % surface_->getwidth(), i / surface_->getwidth(), val_);
    }
}

void surface::invert()
{
    for (int i=0; i<getwidth()*getheight(); i++)
    {
        int val_ = 255 - getpixel(i % getwidth(), i / getwidth());
        setpixel(i % getwidth(), i / getwidth(), val_);
    }
}

void surface::pushbytearray(BYTE datainput[])
{
    for (int i=0; i<LCD_WIDTH*LCD_HEIGHT; i++)
    {
        int value = bgdata[i];
        datainput[i] = value;
    }
}

int surface::getwidth() const {
    return sizewidth;
}

int surface::getheight() const {
    return sizeheight;
}
