Simple usercustomize.py to keep separate site.USER_BASE/USER_SITE directories for 32 and 64bit
python installs on Windows.

Only required if you're installing extension modules (compiled pyd/dll) to the user site-packages directory, i.e.:

    python setup.py install --user
    pip install --user somepackage

Save to %AppData%\Roaming\Python\Python27\site-packages\usercustomize.py

