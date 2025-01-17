/* Dependencies */
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

/* RobloxAPI */
/**
 * Uses roblox's API dump in order to determine if a property or method is part of the API.
 */
export default class RobloxAPI {
    constructor() {
        this.BASE_URL = "https://s3.amazonaws.com/setup.roblox.com/";
        this.VERSION_URL = "https://s3.amazonaws.com/setup.roblox.com/versionQTStudio";

        this.Dump = {};
        this.Classes = {
            // Includes roblox's default libraries (bit32, string, math, debug, coroutine...)
            "bit32": {
                "Name": "bit32",
                "MemoryCategory": "Libraries",
                "Inherits": "<<<ROOT>>>",
                "Tags": [
                    "NotCreatable",
                    "NotBrowsable"
                ],
                "Members": [
                    {
                        "MemberType": "Function",
                        "Name": "arshift",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "disp",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "band",
                        "Parameters": [
                            {
                                "Name": "numbers",
                                "Type": {
                                    "Category": "Tuple",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "bnot",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "bor",
                        "Parameters": [
                            {
                                "Name": "numbers",
                                "Type": {
                                    "Category": "Tuple",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "btest",
                        "Parameters": [
                            {
                                "Name": "numbers",
                                "Type": {
                                    "Category": "Tuple",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "bool"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "bxor",
                        "Parameters": [
                            {
                                "Name": "numbers",
                                "Type": {
                                    "Category": "Tuple",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "byteswap",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "countlz",
                        "Parameters": [
                            {
                                "Name": "n",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "countrz",
                        "Parameters": [
                            {
                                "Name": "n",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "extract",
                        "Parameters": [
                            {
                                "Name": "n",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "field",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "width",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "replace",
                        "Parameters": [
                            {
                                "Name": "n",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "v",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "field",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "width",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "lrotate",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "disp",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "lshift",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "disp",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "rrotate",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "disp",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "rshift",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "disp",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    }
                ]
            },

            "buffer": {
                "Name": "buffer",
                "MemoryCategory": "Libraries",
                "Inherits": "<<<ROOT>>>",
                "Tags": [
                    "NotCreatable",
                    "NotBrowsable"
                ],
                "Members": [
                    {
                        "MemberType": "Function",
                        "Name": "create",
                        "Parameters": [
                            {
                                "Name": "size",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Class",
                            "Name": "buffer"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "fromstring",
                        "Parameters": [
                            {
                                "Name": "str",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Class",
                            "Name": "buffer"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "tostring",
                        "Parameters": [
                            {
                                "Name": "b",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "buffer"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "string"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "len",
                        "Parameters": [
                            {
                                "Name": "b",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "buffer"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "readi8",
                        "Parameters": [
                            {
                                "Name": "b",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "buffer"
                                }
                            },
                            {
                                "Name": "offset",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "readu8",
                        "Parameters": [
                            {
                                "Name": "b",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "buffer"
                                }
                            },
                            {
                                "Name": "offset",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "readi16",
                        "Parameters": [
                            {
                                "Name": "b",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "buffer"
                                }
                            },
                            {
                                "Name": "offset",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "readu16",
                        "Parameters": [
                            {
                                "Name": "b",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "buffer"
                                }
                            },
                            {
                                "Name": "offset",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "readi32",
                        "Parameters": [
                            {
                                "Name": "b",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "buffer"
                                }
                            },
                            {
                                "Name": "offset",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "readu32",
                        "Parameters": [
                            {
                                "Name": "b",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "buffer"
                                }
                            },
                            {
                                "Name": "offset",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "readf32",
                        "Parameters": [
                            {
                                "Name": "b",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "buffer"
                                }
                            },
                            {
                                "Name": "offset",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "readf64",
                        "Parameters": [
                            {
                                "Name": "b",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "buffer"
                                }
                            },
                            {
                                "Name": "offset",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "writei8",
                        "Parameters": [
                            {
                                "Name": "b",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "buffer"
                                }
                            },
                            {
                                "Name": "offset",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "value",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "void"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "writeu8",
                        "Parameters": [
                            {
                                "Name": "b",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "buffer"
                                }
                            },
                            {
                                "Name": "offset",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "value",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "void"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "writei16",
                        "Parameters": [
                            {
                                "Name": "b",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "buffer"
                                }
                            },
                            {
                                "Name": "offset",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "value",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "void"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "writeu16",
                        "Parameters": [
                            {
                                "Name": "b",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "buffer"
                                }
                            },
                            {
                                "Name": "offset",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "value",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "void"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "writei32",
                        "Parameters": [
                            {
                                "Name": "b",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "buffer"
                                }
                            },
                            {
                                "Name": "offset",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "value",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "void"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "writeu32",
                        "Parameters": [
                            {
                                "Name": "b",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "buffer"
                                }
                            },
                            {
                                "Name": "offset",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "value",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "void"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "writef32",
                        "Parameters": [
                            {
                                "Name": "b",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "buffer"
                                }
                            },
                            {
                                "Name": "offset",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "value",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "void"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "writef64",
                        "Parameters": [
                            {
                                "Name": "b",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "buffer"
                                }
                            },
                            {
                                "Name": "offset",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "value",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "void"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "readstring",
                        "Parameters": [
                            {
                                "Name": "b",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "buffer"
                                }
                            },
                            {
                                "Name": "offset",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "count",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "string"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "writestring",
                        "Parameters": [
                            {
                                "Name": "b",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "buffer"
                                }
                            },
                            {
                                "Name": "offset",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "value",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            },
                            {
                                "Default": "null",
                                "Name": "count",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "void"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "copy",
                        "Parameters": [
                            {
                                "Name": "target",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "buffer"
                                }
                            },
                            {
                                "Name": "targetOffset",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "source",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "buffer"
                                }
                            },
                            {
                                "Default": "null",
                                "Name": "sourceOffset",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Default": "null",
                                "Name": "count",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "void"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "fill",
                        "Parameters": [
                            {
                                "Name": "b",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "buffer",
                                }
                            },
                            {
                                "Name": "offset",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "value",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Default": "null",
                                "Name": "count",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "void"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    }
                ]
            },

            "coroutine": {
                "Name": "coroutine",
                "MemoryCategory": "Libraries",
                "Inherits": "<<<ROOT>>>",
                "Tags": [
                    "NotCreatable",
                    "NotBrowsable"
                ],
                "Members": [
                    {
                        "MemberType": "Function",
                        "Name": "close",
                        "Parameters": [
                            {
                                "Name": "co",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "coroutine"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Variant",
                            "Name": "bool, string | void"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "create",
                        "Parameters": [
                            {
                                "Name": "f",
                                "Type": {
                                    "Category": "Function",
                                    "Name": "function"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Class",
                            "Name": "coroutine"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "isyieldable",
                        "Parameters": [],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "bool"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "resume",
                        "Parameters": [
                            {
                                "Name": "co",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "coroutine"
                                }
                            },
                            {
                                "Name": "...",
                                "Type": {
                                    "Category": "Variant",
                                    "Name": "Tuple"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Variant",
                            "Name": "bool, Tuple, string"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "running",
                        "Parameters": [],
                        "ReturnType": {
                            "Category": "Class",
                            "Name": "coroutine"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "status",
                        "Parameters": [
                            {
                                "Name": "co",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "coroutine"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "string"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "wrap",
                        "Parameters": [
                            {
                                "Name": "f",
                                "Type": {
                                    "Category": "Function",
                                    "Name": "function"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Function",
                            "Name": "function"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "yield",
                        "Parameters": [
                            {
                                "Name": "...",
                                "Type": {
                                    "Category": "Tuple",
                                    "Name": "Variant"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Tuple",
                            "Name": "Variant"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    }
                ]
            },

            "debug": {
                "Name": "debug",
                "MemoryCategory": "Libraries",
                "Inherits": "<<<ROOT>>>",
                "Tags": [
                    "NotCreatable",
                    "NotBrowsable"
                ],
                "Members": [
                    {
                        "MemberType": "Function",
                        "Name": "traceback",
                        "Parameters": [
                            {
                                "Name": "message",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            },
                            {
                                "Name": "level",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "string"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "traceback",
                        "Parameters": [
                            {
                                "Name": "thread",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "coroutine"
                                }
                            },
                            {
                                "Name": "message",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            },
                            {
                                "Name": "level",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "string"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "info",
                        "Parameters": [
                            {
                                "Name": "level",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "options",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Tuple",
                            "Name": "Variant"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "info",
                        "Parameters": [
                            {
                                "Name": "function",
                                "Type": {
                                    "Category": "Function",
                                    "Name": "function"
                                }
                            },
                            {
                                "Name": "options",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Tuple",
                            "Name": "Variant"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "info",
                        "Parameters": [
                            {
                                "Name": "thread",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "coroutine"
                                }
                            },
                            {
                                "Name": "level",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "options",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Tuple",
                            "Name": "Variant"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "profilebegin",
                        "Parameters": [
                            {
                                "Name": "label",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "void"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "profileend",
                        "Parameters": [],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "void"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "getmemorycategory",
                        "Parameters": [],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "string"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "setmemorycategory",
                        "Parameters": [
                            {
                                "Name": "tag",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "string"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "resetmemorycategory",
                        "Parameters": [],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "void"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "dumpcodesize",
                        "Parameters": [],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "void"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    }
                ]
            },

            "math": {
                "Name": "math",
                "MemoryCategory": "Libraries",
                "Inherits": "<<<ROOT>>>",
                "Tags": [
                    "NotCreatable",
                    "NotBrowsable"
                ],
                "Members": [
                    {
                        "MemberType": "Function",
                        "Name": "abs",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "acos",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "asin",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "atan",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "atan2",
                        "Parameters": [
                            {
                                "Name": "y",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "ceil",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "clamp",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "min",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "max",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "cos",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "cosh",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "deg",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "exp",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "floor",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "fmod",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "y",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "frexp",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Tuple",
                            "Name": "number,number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "ldexp",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "e",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "log",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "base",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "log10",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "max",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "...",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "min",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "...",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "modf",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Tuple",
                            "Name": "number,number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "noise",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "y",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "z",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "pow",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "y",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "rad",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "random",
                        "Parameters": [
                            {
                                "Name": "m",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "n",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "randomseed",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "void"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "round",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "sign",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "sin",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "sinh",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "sqrt",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "tan",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "tanh",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },

                    {
                        "Category": "Number",
                        "MemberType": "Property",
                        "Name": "huge",
                        "Security": {
                            "Read": "None",
                            "Write": "None"
                        },
                        "Serialization": {
                            "CanLoad": false,
                            "CanSave": false
                        },
                        "ThreadSafety": "ReadSafe",
                        "ValueType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                    },
                    {
                        "Category": "Number",
                        "MemberType": "Property",
                        "Name": "pi",
                        "Security": {
                            "Read": "None",
                            "Write": "None"
                        },
                        "Serialization": {
                            "CanLoad": false,
                            "CanSave": false
                        },
                        "ThreadSafety": "ReadSafe",
                        "ValueType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                    }
                ]
            },

            "os": {
                "Name": "os",
                "MemoryCategory": "Libraries",
                "Inherits": "<<<ROOT>>>",
                "Tags": [
                    "NotCreatable",
                    "NotBrowsable"
                ],
                "Members": [
                    {
                        "MemberType": "Function",
                        "Name": "clock",
                        "Parameters": [],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "date",
                        "Parameters": [
                            {
                                "Name": "formatString",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            },
                            {
                                "Name": "time",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Dictionary",
                            "Name": "Dictionary"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "difftime",
                        "Parameters": [
                            {
                                "Name": "t2",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "t1",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "time",
                        "Parameters": [
                            {
                                "Name": "time",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "table"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    }
                ]
            },

            "string": {
                "Name": "string",
                "MemoryCategory": "Libraries",
                "Inherits": "<<<ROOT>>>",
                "Tags": [
                    "NotCreatable",
                    "NotBrowsable"
                ],
                "Members": [
                    {
                        "MemberType": "Function",
                        "Name": "byte",
                        "Parameters": [
                            {
                                "Name": "s",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            },
                            {
                                "Name": "i",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "j",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "char",
                        "Parameters": [
                            {
                                "Name": "...",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "string"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "find",
                        "Parameters": [
                            {
                                "Name": "s",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            },
                            {
                                "Name": "pattern",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            },
                            {
                                "Name": "init",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "plain",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "bool"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number,number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "format",
                        "Parameters": [
                            {
                                "Name": "formatstring",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            },
                            {
                                "Name": "...",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "string"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "gmatch",
                        "Parameters": [
                            {
                                "Name": "s",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            },
                            {
                                "Name": "pattern",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Function",
                            "Name": "function"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "gsub",
                        "Parameters": [
                            {
                                "Name": "s",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            },
                            {
                                "Name": "pattern",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            },
                            {
                                "Name": "replacement",
                                "Type": {
                                    "Category": "Variant",
                                    "Name": "Variant"
                                }
                            },
                            {
                                "Name": "replacements",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "string,number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "len",
                        "Parameters": [
                            {
                                "Name": "s",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "lower",
                        "Parameters": [
                            {
                                "Name": "s",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "string"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "match",
                        "Parameters": [
                            {
                                "Name": "s",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            },
                            {
                                "Name": "pattern",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            },
                            {
                                "Name": "init",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "string"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "pack",
                        "Parameters": [
                            {
                                "Name": "format",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            },
                            {
                                "Name": "...",
                                "Type": {
                                    "Category": "Variant",
                                    "Name": "Variant"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "string"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "packsize",
                        "Parameters": [
                            {
                                "Name": "format",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "rep",
                        "Parameters": [
                            {
                                "Name": "s",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            },
                            {
                                "Name": "n",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "string"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "reverse",
                        "Parameters": [
                            {
                                "Name": "s",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "string"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "split",
                        "Parameters": [
                            {
                                "Name": "s",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            },
                            {
                                "Name": "separator",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Class",
                            "Name": "table"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "sub",
                        "Parameters": [
                            {
                                "Name": "s",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            },
                            {
                                "Name": "i",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "j",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "string"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "unpack",
                        "Parameters": [
                            {
                                "Name": "format",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            },
                            {
                                "Name": "data",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            },
                            {
                                "Name": "readStart",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Tuple",
                            "Name": "Tuple"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "upper",
                        "Parameters": [
                            {
                                "Name": "s",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "string"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    }
                ]
            },

            "table": {
                "Name": "table",
                "MemoryCategory": "Libraries",
                "Inherits": "<<<ROOT>>>",
                "Tags": [
                    "NotCreatable",
                    "NotBrowsable"
                ],
                "Members": [
                    {
                        "MemberType": "Function",
                        "Name": "clear",
                        "Parameters": [
                            {
                                "Name": "table",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "table"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "void"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "clone",
                        "Parameters": [
                            {
                                "Name": "t",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "table"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Class",
                            "Name": "table"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "concat",
                        "Parameters": [
                            {
                                "Name": "t",
                                "Type": {
                                    "Category": "Array",
                                    "Name": "Array"
                                }
                            },
                            {
                                "Name": "sep",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            },
                            {
                                "Name": "i",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "j",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "string"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "create",
                        "Parameters": [
                            {
                                "Name": "count",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "value",
                                "Type": {
                                    "Category": "Variant",
                                    "Name": "Variant"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Class",
                            "Name": "table"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "find",
                        "Parameters": [
                            {
                                "Name": "haystack",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "table"
                                }
                            },
                            {
                                "Name": "needle",
                                "Type": {
                                    "Category": "Variant",
                                    "Name": "Variant"
                                }
                            },
                            {
                                "Name": "init",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Variant",
                            "Name": "Variant"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "freeze",
                        "Parameters": [
                            {
                                "Name": "t",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "table"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Class",
                            "Name": "table"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "insert",
                        "Parameters": [
                            {
                                "Name": "t",
                                "Type": {
                                    "Category": "Array",
                                    "Name": "Array"
                                }
                            },
                            {
                                "Name": "pos",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "value",
                                "Type": {
                                    "Category": "Variant",
                                    "Name": "Variant"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "void"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "insert",
                        "Parameters": [
                            {
                                "Name": "t",
                                "Type": {
                                    "Category": "Array",
                                    "Name": "Array"
                                }
                            },
                            {
                                "Name": "value",
                                "Type": {
                                    "Category": "Variant",
                                    "Name": "Variant"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "void"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "isfrozen",
                        "Parameters": [
                            {
                                "Name": "t",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "table"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "bool"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "maxn",
                        "Parameters": [
                            {
                                "Name": "t",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "table"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "move",
                        "Parameters": [
                            {
                                "Name": "src",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "table"
                                }
                            },
                            {
                                "Name": "a",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "b",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "t",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "dst",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "table"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Class",
                            "Name": "table"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "pack",
                        "Parameters": [
                            {
                                "Name": "values",
                                "Type": {
                                    "Category": "Variant",
                                    "Name": "Variant"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Variant",
                            "Name": "Variant"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "remove",
                        "Parameters": [
                            {
                                "Name": "t",
                                "Type": {
                                    "Category": "Array",
                                    "Name": "Array"
                                }
                            },
                            {
                                "Name": "pos",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Variant",
                            "Name": "Variant"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "sort",
                        "Parameters": [
                            {
                                "Name": "t",
                                "Type": {
                                    "Category": "Array",
                                    "Name": "Array"
                                }
                            },
                            {
                                "Name": "comp",
                                "Type": {
                                    "Category": "Function",
                                    "Name": "function"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "void"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "unpack",
                        "Parameters": [
                            {
                                "Name": "list",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "table"
                                }
                            },
                            {
                                "Name": "i",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "j",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Tuple",
                            "Name": "Tuple"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    }
                ]
            },

            "thread": {
                "Name": "thread",
                "MemoryCategory": "Libraries",
                "Inherits": "<<<ROOT>>>",
                "Tags": [
                    "NotCreatable",
                    "NotBrowsable"
                ],
                "Members": [
                    {
                        "MemberType": "Function",
                        "Name": "spawn",
                        "Parameters": [
                            {
                                "Name": "functionOrThread",
                                "Type": {
                                    "Category": "Variant",
                                    "Name": "function | coroutine"
                                }
                            },
                            {
                                "Name": "...",
                                "Type": {
                                    "Category": "Variant",
                                    "Name": "Variant"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Class",
                            "Name": "coroutine"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "defer",
                        "Parameters": [
                            {
                                "Name": "functionOrThread",
                                "Type": {
                                    "Category": "Variant",
                                    "Name": "function | coroutine"
                                }
                            },
                            {
                                "Name": "...",
                                "Type": {
                                    "Category": "Variant",
                                    "Name": "Variant"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Class",
                            "Name": "coroutine"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "delay",
                        "Parameters": [
                            {
                                "Name": "duration",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "functionOrThread",
                                "Type": {
                                    "Category": "Variant",
                                    "Name": "function | coroutine"
                                }
                            },
                            {
                                "Name": "...",
                                "Type": {
                                    "Category": "Variant",
                                    "Name": "Variant"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Class",
                            "Name": "coroutine"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "desynchronize",
                        "Parameters": [],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "void"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "synchronize",
                        "Parameters": [],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "void"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "wait",
                        "Parameters": [
                            {
                                "Name": "duration",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "cancel",
                        "Parameters": [
                            {
                                "Name": "thread",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "coroutine"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "void"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    }
                ]
            },

            "utf8": {
                "Name": "utf8",
                "MemoryCategory": "Libraries",
                "Inherits": "<<<ROOT>>>",
                "Tags": [
                    "NotCreatable",
                    "NotBrowsable"
                ],
                "Members": [
                    {
                        "MemberType": "Function",
                        "Name": "char",
                        "Parameters": [
                            {
                                "Name": "codepoints",
                                "Type": {
                                    "Category": "Tuple",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "string"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "codes",
                        "Parameters": [
                            {
                                "Name": "str",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Function",
                            "Name": "function,string,number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "codepoint",
                        "Parameters": [
                            {
                                "Name": "str",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            },
                            {
                                "Name": "i",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "j",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Tuple",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "len",
                        "Parameters": [
                            {
                                "Name": "s",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            },
                            {
                                "Name": "i",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "j",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "offset",
                        "Parameters": [
                            {
                                "Name": "s",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            },
                            {
                                "Name": "n",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "i",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number?"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "graphemes",
                        "Parameters": [
                            {
                                "Name": "str",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            },
                            {
                                "Name": "i",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "j",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Function",
                            "Name": "function"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "nfcnormalize",
                        "Parameters": [
                            {
                                "Name": "str",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "string"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "nfdnormalize",
                        "Parameters": [
                            {
                                "Name": "str",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "string"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "string"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },

                    {
                        "Category": "String",
                        "MemberType": "Property",
                        "Name": "charpattern",
                        "Security": {
                            "Read": "None",
                            "Write": "None"
                        },
                        "Serialization": {
                            "CanLoad": false,
                            "CanSave": false
                        },
                        "ThreadSafety": "ReadSafe",
                        "ValueType": {
                            "Category": "Primitive",
                            "Name": "string"
                        },
                    }
                ],
            },

            "vector": {
                "Name": "vector",
                "MemoryCategory": "Libraries",
                "Inherits": "<<<ROOT>>>",
                "Tags": [
                    "NotCreatable",
                    "NotBrowsable"
                ],
                "Members": [
                    {
                        "MemberType": "Function",
                        "Name": "create",
                        "Parameters": [
                            {
                                "Name": "x",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "y",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            },
                            {
                                "Name": "z",
                                "Type": {
                                    "Category": "Primitive",
                                    "Name": "number"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Class",
                            "Name": "vector"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "magnitude",
                        "Parameters": [
                            {
                                "Name": "vec",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "vector"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "normalize",
                        "Parameters": [
                            {
                                "Name": "vec",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "vector"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Class",
                            "Name": "vector"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "cross",
                        "Parameters": [
                            {
                                "Name": "vec1",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "vector"
                                }
                            },
                            {
                                "Name": "vec2",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "vector"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Class",
                            "Name": "vector"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "dot",
                        "Parameters": [
                            {
                                "Name": "vec1",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "vector"
                                }
                            },
                            {
                                "Name": "vec2",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "vector"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "angle",
                        "Parameters": [
                            {
                                "Name": "vec1",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "vector"
                                }
                            },
                            {
                                "Name": "vec2",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "vector"
                                }
                            },
                            {
                                "Name": "axis",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "vector"
                                },
                                "Optional": true
                            }
                        ],
                        "ReturnType": {
                            "Category": "Primitive",
                            "Name": "number"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "floor",
                        "Parameters": [
                            {
                                "Name": "vec",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "vector"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Class",
                            "Name": "vector"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "ceil",
                        "Parameters": [
                            {
                                "Name": "vec",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "vector"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Class",
                            "Name": "vector"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "abs",
                        "Parameters": [
                            {
                                "Name": "vec",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "vector"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Class",
                            "Name": "vector"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "sign",
                        "Parameters": [
                            {
                                "Name": "vec",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "vector"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Class",
                            "Name": "vector"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "clamp",
                        "Parameters": [
                            {
                                "Name": "vec",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "vector"
                                }
                            },
                            {
                                "Name": "min",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "vector"
                                }
                            },
                            {
                                "Name": "max",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "vector"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Class",
                            "Name": "vector"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "max",
                        "Parameters": [
                            {
                                "Name": "...",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "vector"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Class",
                            "Name": "vector"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },
                    {
                        "MemberType": "Function",
                        "Name": "min",
                        "Parameters": [
                            {
                                "Name": "...",
                                "Type": {
                                    "Category": "Class",
                                    "Name": "vector"
                                }
                            }
                        ],
                        "ReturnType": {
                            "Category": "Class",
                            "Name": "vector"
                        },
                        "Security": "None",
                        "ThreadSafety": "Safe"
                    },

                    {
                        "Category": "Vector",
                        "MemberType": "Property",
                        "Name": "zero",
                        "Security": {
                            "Read": "None",
                            "Write": "None"
                        },
                        "Serialization": {
                            "CanLoad": false,
                            "CanSave": false
                        },
                        "ThreadSafety": "ReadSafe",
                        "ValueType": {
                            "Category": "Class",
                            "Name": "vector"
                        },
                    },
                    {
                        "Category": "Vector",
                        "MemberType": "Property",
                        "Name": "one",
                        "Security": {
                            "Read": "None",
                            "Write": "None"
                        },
                        "Serialization": {
                            "CanLoad": false,
                            "CanSave": false
                        },
                        "ThreadSafety": "ReadSafe",
                        "ValueType": {
                            "Category": "Class",
                            "Name": "vector"
                        },
                    }
                ]
            }
        };
        this.Enums = {};
    }


    /**
     * Initialize
     */
    init() {
        return new Promise(async (resolve, reject) => {
            try {
                const studioVersion = await this.fetchStudioVersion();
                const dump = await this.fetchAPIDump(studioVersion);
                console.log(`RobloxAPI> Loaded API Dump for Studio Version ${studioVersion}. Processing...`);

                this.Dump = dump;
                this.StudioVersion = studioVersion;
                await this.processDump();

                console.log(`RobloxAPI> Finished processing API Dump.`);
                resolve("Hell yeah!");
            } catch (error) {
                throw new Error(`RobloxAPI> Unable to initialize: ${error.message}`);
            }
        });
    }


    /**
     * Fetches the latest version of Roblox Studio.
     * @returns {string} - Latest version of Studio
     */
    fetchStudioVersion() {
        return new Promise(async (resolve, reject) => {
            try {
                const request = await fetch(this.VERSION_URL);
                const response = await request.text(); // Response data should be: version-VERSIONNUMBER
                return resolve(response);
            } catch (error) {
                return reject(error);
            }
        });
    }


    /**
     * Fetches Roblox's latest API Dump.
     * @param {string} studioVersion - Version of Studio to check against.
     * @returns {Object} - Object containing Roblox's API dump.
     */
    fetchAPIDump(studioVersion = "version-d0e8cfcd943d4ae2" /* Fallback if non is given, use this one (from 17th January 2025) */) {
        return new Promise(async (resolve, reject) => {
            const URL = `${this.BASE_URL}${studioVersion}-API-Dump.json`;
            try {
                const request = await fetch(URL);
                const response = await request.json();
                return resolve(response);
            } catch (error) {
                return reject(error);
            }
        });
    }


    /**
     *
     * @returns
     */
    processDump() {
        return new Promise(async (resolve, reject) => {
            try {
                await this.processClasses();
                await this.processEnums();

                // Write the processed data to a file studioVersion
                console.log(`RobloxAPI> Writing processed data to file...`);
                fs.writeFileSync(dirname(fileURLToPath(import.meta.url)) + `/RobloxAPIDumps/${this.StudioVersion}.json`, JSON.stringify({
                    Comment: `Dumped from Roblox Studio ${this.StudioVersion} API Dump`,
                    Date: new Date(),
                    Classes: this.Classes,
                    Enums: this.Enums
                }, null, 4));

                return resolve(true);
            } catch (error) {
                return reject(error);
            }
        });
    }


    /**
     *
     * @returns
     */
    processClasses() {
        return new Promise(async (resolve, reject) => {
            try {

                const { Classes } = this.Dump;
                const processedClasses = {};

                /**
                 * Class structure:
                 * {
                 *   Name: string, // Class name
                 *   MemoryCategory: string, // The memory category of the class
                 *   Superclass: string, // Inherited from, if any. For example: Superclass = "Instance" -> The class will also include the properties & methods of "Instance"
                 *   Tags: string[], // "NotCreatable", "Service", "NotBrowsable"
                 *   Members: Member[] // Properties & methods
                 * }
                 *
                 * Member structure:
                 * {
                 *   Name: string, // Member name
                 *   MemberType: string, // "Property", "Function" (Methods), "Event"...
                 *   Category?: string, // "Behavior", "Data"...
                 *   Security: { Read: string, Write: string } | string ("None"), // "LocalUserSecurity", "None"...
                 *   Serialization: { CanLoad: boolean, CanSave: boolean }, // Whether the member can be loaded or saved
                 *   ThreadSafety: string, // "ReadSafe", ...
                 *   ValueType (For Properties): { Category: string, Name: string }, // The type of the property
                 *   ReturnType (For Methods): { Category: string, Name: string }, // The return type of the method
                 *   Parameters (For Methods): Parameter[] // Method parameters
                 * }
                 *
                 * Parameters structure:
                 * {
                 *   Name: string, // Parameter name
                 *   Type: { Category: string, Name: string }, // The type of the parameter
                 * }
                 */
                for (const Class of Classes) {
                    const { Name, Superclass, MemoryCategory, Tags, Members } = Class;
                    //console.log(`Processing class: ${Name} (${MemoryCategory}) - Inherited from: ${Superclass || "None"}`);

                    // Adds it to the processedClasses
                    processedClasses[Name] = {
                        Name: Name,
                        MemoryCategory: MemoryCategory,
                        Inherits: Superclass,
                        Tags: Tags,
                        Members: Members,
                    };

                    // If inherited, it will also include the members of the superclass
                    if (Superclass && processedClasses[Superclass]) {
                        const SuperclassMembers = Classes.find((c) => c.Name === Superclass).Members;
                        if (SuperclassMembers) {
                            SuperclassMembers.forEach((member) => {
                                member.InheritedFrom = Superclass;
                            });

                            processedClasses[Name].Members = [...SuperclassMembers, ...Class.Members];
                        }
                    }
                }

                this.Classes = { ...this.Classes, ...processedClasses };
                resolve(true);
            } catch (error) {
                throw new Error(`Error processing classes: ${error.message}`);
            }
        });
    }


    /**
     *
     * @returns
     */
    processEnums() {
        return new Promise(async (resolve, reject) => {
            try {
                const { Enums } = this.Dump;
                this.Enums = { ...this.Enums, ...Enums };

                resolve(true)
            } catch (error) {
                throw new Error(`Error processing enums: ${error.message}`);
            }
        });
    }


    /* Utils */
    /**
     * Gets a class object by name
     * @param {string} name - Name of the class
     * @returns - Returns the class object
     */
    getClassByName(name) {
        const ClassesObject = this.Classes;
        const Found = Object.keys(ClassesObject).find(Class => ClassesObject[Class].Name === name);
        if (Found) {
            return ClassesObject[Found];
        }
        return null;
    }


    /**
     *
     * @param {*} className
     * @param {*} memberName
     * @returns
     */
    getClassMemberByName(className, memberName) {
        const Class = this.getClassByName(className);
        if (Class) {
            const Found = Object.keys(Class.Members).find(Member => Class.Members[Member].Name === memberName);
            if (Found) {
                return Class.Members[Found];
            }
        }
        return null;
    }


    /**
     *
     * @param {*} memberName
     * @returns
     */
    getClassesThatGotMemberByName(memberName) {
        const ClassesObject = this.Classes;
        const FoundClasses = Object.keys(ClassesObject).filter((ClassKey) => {
            const Class = ClassesObject[ClassKey];

            // Ensure Class and Class.Members exist
            if (!Class || !Class.Members || typeof Class.Members !== "object") {
                return false;
            }

            return Object.keys(Class.Members).some(
                (MemberKey) => {
                    const Member = Class.Members[MemberKey];
                    return Member && Member.Name === memberName;
                }
            );
        });

        return FoundClasses.length > 0 ? FoundClasses : null;
    }
}