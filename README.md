# ShadowMap

A vulgar attempt in order to "anonymize" a luau codebase by renaming identifiers and keeping integrity between multiple files.

### Before usage

This code isn't done and is NOT meant to be used for production. It's a proof of concept and is likely to be broken. (Actually it is.)
It was written in a few hours and is a very basic implementation. It's not even close to being a real anonymizer. It's just a simple string replacement tool.

### Known issues

- Some types from Roblox's API are not handled correctly. This is because the new Roblox API Dump class fetches Classes and Enums. However it doesn't fetch the [Data Types](https://create.roblox.com/docs/reference/engine/datatypes) as it is not in the json dumped by their API. This means that some types will still be anonymized.
- Enums implementation is yet to come. For now, there's only Class checks for Member Expressions. This means that Enums will still be anonymized.
- Optimization problems: I know as for now the code isn't as optimized as I'd want it to be.
- As explained later in the readme, not all type checking is done. See ["Planned"](#planned) for more information.
- For all the JavaScript haters, yeah I used JS and not another language for that. Yeah I could've used something like C++ or Rust to do that but I couldn't be asked. So no need to come to me asking me "Why is this JS boohoo fuck JS". I needed this to be done fast and this is the language I know the most. Although I hear you, I might re-do the whole thing in another language when I'll both have time for that and motivation. For now, it's in JS, and cry about it.

### Usage

After some testing for my own scripts used in Roblox games, it seems to work "fine". The output code still needs a lot of corrections and tweaking regarding:
- Obfuscated strings -> Some are not encoded correctly, which leads to errors or these to be unreadable.
- Properties (Some properties are anonymized when they shouldn't, and vice versa. Simple example with `StatusCode` for `HttpService:RequestAsync`, etc...)
- As stated in ["Known issues"](#known-issues), Enums and some types aren't handled correctly.

### Examples

Before anonymizing it:
```lua
local test = {
    Property = "Test Property",
}
test.__index = test

local function TestFunction(name: string): string
    return "Hello, World! " .. name
end

local function AnotherTestFunction(a: number, b: number)
    print(a + b)
end

function test:Method()
    local Players: Players = game:GetService("Players")
    local Player: Player? = Players.LocalPlayer

    if Player then
        local Character: Model | BasePart = Player.Character
        print(Player, Character)
    end

    for i, v in pairs(self) do
        if i == "Property" then
            local testDeMerde: number | BasePlayerGui = i
            print(i, testDeMerde)
            continue
        end
    end

    for i = 1, 10, 1 do
        if i == 5 then
            break
        end
    end
end

local PlayerName = "Roblox"
local stuff = 1 + ((1 * 2) / 2)

stuff = 25

TestFunction(PlayerName)
AnotherTestFunction(2, 2)

return test
```

After anonymizing it:
```lua
local LLEpgoTWBzkOGAU8eJMPx7 = { n3r04DIwl5l7QInE0hokZ7 = "Test Property" }
LLEpgoTWBzkOGAU8eJMPx7.__index = LLEpgoTWBzkOGAU8eJMPx7

local function gEncqo0sSO43IeuvUGIxUu(uRTSL6CZuxQ2kTnf15udy9)
    return ("Hello, World! " .. uRTSL6CZuxQ2kTnf15udy9)
end

local function VmIdFfxkWxvHahbHkrVAds(rvCvtpIOHVgIfv88hY7sTD, qA8wFVkkggApqjSDaeiyz6)
    print((rvCvtpIOHVgIfv88hY7sTD + qA8wFVkkggApqjSDaeiyz6))
end

function LLEpgoTWBzkOGAU8eJMPx7:ykv6SNbzxgUtLR2XoLNyXT()
    local d7xEpYGlYQugLKbfhfo310 = game:GetService("Players")
    local XrrLOtHABY289cZHS5wHHj = d7xEpYGlYQugLKbfhfo310.LocalPlayer

    if XrrLOtHABY289cZHS5wHHj then
        local UiYenYZ7gHZ4oSOdk81pD5 = XrrLOtHABY289cZHS5wHHj.Character
        print(XrrLOtHABY289cZHS5wHHj, UiYenYZ7gHZ4oSOdk81pD5)
    end

    for m3SGG5qzKmKIQsC18nElet, n8eCMyUypOsq8h0gUYTtzv in pairs(self) do
        if (m3SGG5qzKmKIQsC18nElet == "Property") then
            local QXkOlB5Ha3coDGK9lx40K7 = m3SGG5qzKmKIQsC18nElet
            print(m3SGG5qzKmKIQsC18nElet, QXkOlB5Ha3coDGK9lx40K7)
            continue
        end
    end

    for m3SGG5qzKmKIQsC18nElet = 1, 10, 1 do
        if (m3SGG5qzKmKIQsC18nElet == 5) then
            break
        end
    end
end

local uxGunt7eWpMduJ3SdYDzxz = "Roblox"
local RVzBOaFlDPJZnOxRcNcBCj = (1 + ((1 * 2) / 2))

RVzBOaFlDPJZnOxRcNcBCj = 25

gEncqo0sSO43IeuvUGIxUu(uxGunt7eWpMduJ3SdYDzxz)
VmIdFfxkWxvHahbHkrVAds(2, 2)

return LLEpgoTWBzkOGAU8eJMPx7
```

### Planned

- Actively check for properties and methods directly from roblox's API dumps as type annotation support has been added to the parser. Also in case of unannotated codebase, print out in the console doubts about the code's obfuscation and display something like `The property '.PropertyName' is also used in the Roblox API. In case of doubt, it has not been anonymized.`, same with methods.
- Basic type annotation support has been added but still needs to be expanded as it doesn't support these for now:
```lua
-- Lacks support for Table types
type MyType = {
    MyProperty: string,
    MyMethod: function(self: MyType, arg1: string, arg2: string): string,
}

local MyTable: MyType = {
    MyProperty = "Hello, World!",
    MyMethod = function(self, arg1, arg2)
        return arg1 .. arg2
    end
}

-- Lacks support for Generics (Generics types and functions)
type Pairs<T> = { first: T, second: T }

local strings: Pair<string> = { first = "Hello", second = "World" }
local numbers: Pair<number> = { first = 1, second = 2 }

local function genericFunction<T>(arg: T): T
    return arg
end

-- Even though I added support for union types and nullable types, it still lacks support for intersection, singleton and variadic types
-- I'd also like to add support for type variations (e.g.: type F (...number) -> ...string)
-- And type packs (e.g.: type Signal<T, U...> = { f: (T, U...) -> (), data: T })
-- Examples taken from https://luau.org/typecheck
```
- Add luaparse support for if-then-else expressions, compound assignments (just using a simple workaround for now), generalized iterations as well as string interpolations.
- Possibly switch to typescript.
- Comment the code more.
- Go through extensive testing to ensure the anonymization process is working correctly.
- Support for multiple files and insure the integrity of the code is maintained. (Basically, methods defined in another script should be renamed in other files using those)
- Basic string encryptions as well, nothing too crazy but just to make strings less readable.
- If I really can be arsed to do that, update luaparse for it to be OOP and suitable for the latest ES conventions.

### Contributing

Please feel free to contribute and add your own little things to it! I'm working solo on this project, and my job / other projects are taking up a lot of my time. Any help is greatly appreciated!

I know the current codebase looks ugly and is NOT optimized at all. At the beginning, this was just like a test to see what I could do and how I could do it. I'm open to any suggestions and ideas on how to improve it. For now though, it's just a test file without any real comments or documentation. I'll be adding those as I go along.
