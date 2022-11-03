// only for + Operators to add strings


/*
  Operator "+" --> addition of 2 strings
*/
pub fun (+) (left: string, right: string): string {
  return left ++ right
}

/*
  Operator "+" --> addition of 2 list<string>
*/
pub fun (+) (left: list<a>, right: list<a>): list<a> {
  return left ++ right
}