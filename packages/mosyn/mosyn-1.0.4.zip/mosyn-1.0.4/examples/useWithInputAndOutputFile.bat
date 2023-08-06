:: Source: https://github.com/uagdataanalysis/mosynapi
:: Install MoSyn before execute this script.
::      pip install mosyn
:: Shows MoSyn Help

@echo off

echo "MoSyn Test: Loading and saving in files."

python mosyn --input-file "Poema20.txt" --output-file "Poema20_morphological.txt"

pause

@echo on