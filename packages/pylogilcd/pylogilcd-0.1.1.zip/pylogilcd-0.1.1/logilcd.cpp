#include "windows.h"
#include "surface.h"
#include "logitechlcd.h"
#include "logilcd.h"

#include <tchar.h>
#include <string>
#include <cmath>

using namespace std;

wstring s2ws(const std::string& str)
{
    int size_needed = MultiByteToWideChar(CP_UTF8, 0, &str[0], (int)str.size(), NULL, 0);
    std::wstring wstrTo( size_needed, 0 );
    MultiByteToWideChar(CP_UTF8, 0, &str[0], (int)str.size(), &wstrTo[0], size_needed);
    return wstrTo;
}

app::app(char *Appname, int LCD_TYPE) {
    LcdType = LCD_TYPE;
    wstring wappname = s2ws(string(Appname));
    LogiLcdInit(const_cast<wchar_t*>(wappname.c_str()), LcdType);
}


app::~app() {
    LogiLcdShutdown();
}

void app::update(surface Surface) {
    BYTE screendata[LOGI_LCD_MONO_WIDTH*LOGI_LCD_MONO_HEIGHT];
    Surface.pushbytearray(screendata);
    LogiLcdMonoSetBackground(screendata);
    LogiLcdUpdate();
}

bool app::getbuttonpressed(int button) {
    int buttonid = pow(2, button);
    return !LogiLcdIsButtonPressed(buttonid);
}

void app::update() {
    LogiLcdUpdate();
}

int main() {
    return 0;
}
