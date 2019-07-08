local EXT_SECTION, EXT_KEY = 'reaperwrb', 'midi_editor'

local command = reaper.GetExtState(EXT_SECTION, EXT_KEY)
reaper.DeleteExtState(EXT_SECTION, EXT_KEY, true)

local editor = reaper.MIDIEditor_GetActive()
if command and editor then
  local cmdId = reaper.NamedCommandLookup(command)
  reaper.MIDIEditor_OnCommand(editor, cmdId)
end