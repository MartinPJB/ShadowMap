# ShadowMap

A vulgar attempt in order to "anonymize" a luau codebase by renaming identifiers and keeping integrity between multiple files.

### Before usage

This code isn't done and is NOT meant to be used for production. It's a proof of concept and is likely to be broken. (Actually it is.)
It was written in a few hours and is a very basic implementation. It's not even close to being a real anonymizer. It's just a simple string replacement tool.

### Known issues

Some variables may not be renamed correctly, and the anonymizer still doesn't recognizes roblox's API properties and methods. If you want to keep your codebase's integrity safe, do not use this tool yet.

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

TestFunction(PlayerName)
AnotherTestFunction(2, 2)

return test
```

After anonymizing it:
```lua
local In1tmqFa3Fdwm4SNLka9vq = { LxloHX8HEfQo8MW2vJeAjo = "Test Property" }
In1tmqFa3Fdwm4SNLka9vq.__index = In1tmqFa3Fdwm4SNLka9vq

local function BiYB4rlLbE93m1cEZOp9tT(LR8FmZu3MeC4AvCgOjblbX)
    return ("Hello, World! " .. LR8FmZu3MeC4AvCgOjblbX)
end

local function CkE9IUZ7OUYmljmvg8ksRy(QOrIFyoJwcB956RI0kaVqV, qwJyj47DFQNei9U7MHVgTY)
    print((QOrIFyoJwcB956RI0kaVqV + qwJyj47DFQNei9U7MHVgTY))
end

function In1tmqFa3Fdwm4SNLka9vq:Od3J9zHcQLJ2rblrmWQxdG()
    local D6Vd4oNktdCIEGqWcsqZlV = DzXuIhNxH4SzYR51TalrWJ:BSgZrDaUMD1dU07gYb5K3S("Players") -- You can see game:GetService gets obfuscated -> Unwanted result.
    local cVXwVN9nPv1quJnBC3hW4H = D6Vd4oNktdCIEGqWcsqZlV.NFC5ydqgNkdYkElzhP71YU -- You can see LocalPlayer gets obfuscated -> Unwanted result.
    if cVXwVN9nPv1quJnBC3hW4H then
        local y9wJkUdVnss7HXo0tsQM4E = cVXwVN9nPv1quJnBC3hW4H.y9wJkUdVnss7HXo0tsQM4E -- You can see Character gets obfuscated -> Unwanted result.
        print(cVXwVN9nPv1quJnBC3hW4H, y9wJkUdVnss7HXo0tsQM4E)
    end

    for GMtREuFvcQOtcLOwWFCcEI, vdkl8DOGnJA788qs1JMsp8 in pairs(self) do
        if (GMtREuFvcQOtcLOwWFCcEI == "Property") then
            local RpyRHvXq3EbXKxVOgmBuue = GMtREuFvcQOtcLOwWFCcEI
            print(GMtREuFvcQOtcLOwWFCcEI, RpyRHvXq3EbXKxVOgmBuue)
            continue
        end
    end

    for GMtREuFvcQOtcLOwWFCcEI = 1, 10, 1 do
        if (GMtREuFvcQOtcLOwWFCcEI == 5) then
            break
        end
    end
end

local ZaunbMH1WrcApEG9QWDjbW = "Roblox"
local tBKZjSpoBURifG0dAgJTD8 = (1 + ((1 * 2) / 2))

BiYB4rlLbE93m1cEZOp9tT(ZaunbMH1WrcApEG9QWDjbW)
CkE9IUZ7OUYmljmvg8ksRy(2, 2)

return In1tmqFa3Fdwm4SNLka9vq
```

### Planned

- Actively check for properties and methods directly from roblox's API dumps as type annotation support has been added to the parser. Also in case of unannotated codebase, print out in the console doubts about the code's obfuscation and display something like `The property '.PropertyName' is also used in the Roblox API. In case of doubt, it has not been anonymized.`, same with methods.
- Possibly switch to typescript
- Comment the code
- Go through extensive testing to ensure the anonymization process is working correctly
- Support for multiple files and insure the integrity of the code is maintained. (Basically, methods defined in another script should be renamed in other files using those)
- Basic string encryptions as well, nothing too crazy but just to make strings less readable

### Contributing

Please feel free to contribute and add your own little things to it! I'm working solo on this project, and my job / other projects are taking up a lot of my time. Any help is greatly appreciated!

I know the current codebase looks ugly and is NOT optimized at all. At the beginning, this was just like a test to see what I could do and how I could do it. I'm open to any suggestions and ideas on how to improve it. For now though, it's just a test file without any real comments or documentation. I'll be adding those as I go along.
