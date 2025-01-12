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