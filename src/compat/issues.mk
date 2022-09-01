# Issues with upgrade to kokav2

### String Problems

Files:
- metadata.kk (lines: 152)
- storage.kk (lines: 181)
- expression.kk (lines: 244, 278)




### Effect Problems

Files:
- expression.kk (lines: 233)
	- Error : value definition is recursive. recursive group: [expression/parseAtom,expression/parseIf,expression/parseExpr,expression/parseBinary,expression/parseUnary] 