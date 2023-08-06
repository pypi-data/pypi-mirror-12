:: Source: https://github.com/uagdataanalysis/mosynapi
:: Install MoSyn before execute this script.
::      pip install mosyn
:: pip install mosyn
:: Shows MoSyn Help

@echo off

echo "MoSyn Test: Using an external dictionary."

python mosyn --input-file "Poema20.txt" --output-file "Poema20_morphological.txt" --dictionary "../mosyn/dict/spanish_dict.csv"

pause

@echo on