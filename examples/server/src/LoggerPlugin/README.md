# Rule Configuration

rules.json is a JSON Array with each JSON Object being a seperate rule.

Rules have the following format:

## Header Access Control
Verify the request via request header

### Skeleton:
```json
{
    "field": <String>,
    "category": "header",
    "operation": <Operation>,
    "compare": <String>,
    "value": <String, Array of Strings>,
    "error": <ErrorHandling>*,
    "policy": <Allow/Deny>*
}
```

**field**: which field this rule applies to , "*" for all fields

**operation**: use one of the following [CONTAINS, EQUAL, UNEQUAL, GREATER, LESS, GEQ, LEQ]

**compare**: which header attribute needs to be checked

**value**: the value the header attribute needs to have based on operation. if operation == CONTAINS, the header attribute needs to contain the given value. If it is an array, the header attribute needs to contain one of the given values.

**error**: optional argument, on default: EMPTYSTRING . Possible arguments:

- EMPTYSTRING: replace field value with an empty string
- DELETE: deletes the field completely
- FORBIDDEN: throws a forbidden at the user

**policy**: optional argument, on default: "allow" which means that the rule only allows access to the field if the conditions are met. "deny" would do the opposite.

### Example:
```json
{
    "field": "TrackerDistance",
    "category": "header",
    "operation": "CONTAINS",
    "compare": "user-agent",
    "value": "Chrome",
    "policy": "deny"
}
```

This HeaderRule would display an empty string in the "TrackerDistance" field if the user-agent of the request contain "Chrome".

## Purpose Access Control
Verify the request via given purpose

### Skeleton:
```json
{
    "field": <String>,
    "category": "purpose",
    "purpose": <String, Array of Strings>,
    "exception": <String, Array of Strings>
    "error": <ErrorHandling>*,
    "policy": <Allow/Deny>*
}
```

**purpose**: The purpose(s) and everything beneath it that are allowed for the field

**exception**: If a purpose beneath the given purpose isn't allowed to see the field

### Example:
```json
{
    "field": "TotalSteps",
    "category": "purpose",
    "purpose": "health",
    "exception": "prescriptive sleep analytics",
    "error": "delete"
}
```

This PurposeRule would delete the field "TotalSteps" if the stated purpose wasn't health or anything beneath it. "Prescriptive sleep analytics" is the only exception to that rule.

```json
{
    "field": "TotalSteps",
    "category": "purpose",
    "purpose": "health",
    "exception": "prescriptive sleep analytics",
    "error": "delete",
    "policy": "deny"
}
```

This PurposeRule would delete the field "TotalSteps" if the stated purpose was health or anything beneath it. "Prescriptive sleep analytics" is the only exception to that rule.
