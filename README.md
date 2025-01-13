# ShadowMap

A vulgar attempt in order to "anonymify" a luau codebase by renaming identifiers.

### Before usage

This code isn't done and is NOT meant to be used for production. It's a proof of concept and is likely to be broken. (Actually it is.)
It was written in a few hours and is a very basic implementation. It's not even close to being a real anonymizer. It's just a simple string replacement tool.

### Known issues

Some variables may not be renamed correctlly, or even worse, some properties belonging to Roblox's built-in objects may be renamed, causing the target scripts to cause errors. For now, the code doesn't actively support roblox's built-in API including:
- DataTypes
- Classes
- Libraries

### Examples

Before anonymizing it:
```lua
local test = {
    Property = "Test Property",
}
test.__index = test;

local function TestFunction(name)
    return "Hello, World! " .. name
end

function test:Method()
    local Players = game:GetService("Players")
    local Player = Players.LocalPlayer

    if Player then
        local Character = Player.Character
        print(Player, Character)
    end
end

local PlayerName = "Cheeto"
TestFunction(PlayerName)

return test
```

After anonymizing it:
```lua
local v0 = { v1 = "Test Property" }
v0.__index = v0

local function v7(v5)
    return "Hello, World! " .. v5
end

function v0:v19()
    local Players = game:GetService("Players")
    local Player = Players.LocalPlayer
    if Player then
        local Character = Player.Character -- You can already see some variables aren't renamed
        print(Player, Character) -- In this case, it's because they are associated to Roblox's built-in DataTypes (put in a primitive whitelist)
    end
end

local v20 = "Cheeto"
v7(v20)

return v0
```

### Planned

- Detect and avoid anonymizing built-in functions and variables from Roblox. -> Will use the type of the variable to determine if it's a built-in or not. So make sure to explicitely declare the type of the variable if it's not a built-in. For example: `local players = game:GetService("Players")` should be `local players: Players = game:GetService("Players")`
- Possibly switch to typescript
- Avoid having a single huge file for all the classes
- Comment the code
- Go through extensive testing to ensure the anonymization process is working correctly
- Support for multiple files and insure the integrity of the code is maintained. (Basically, methods defined in another script should be renamed in other files using those)
- Basic string encryptions as well, nothing too crazy but just to make strings less readable

### Contributing

Please feel free to contribute and add your own little things to it! I'm working solo on this project, and my job / other projects are taking up a lot of my time. Any help is greatly appreciated!

I know the current codebase looks ugly and is NOT optimized at all. At the beginning, this was just like a test to see what I could do and how I could do it. I'm open to any suggestions and ideas on how to improve it. For now though, it's just a test file without any real comments or documentation. I'll be adding those as I go along.
