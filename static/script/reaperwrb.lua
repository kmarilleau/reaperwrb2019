-- MIDI EDITOR ACTIONS
local EXT_SECTION, EXT_KEY = 'reaperwrb', 'midi_editor'

local command = reaper.GetExtState(EXT_SECTION, EXT_KEY)
reaper.DeleteExtState(EXT_SECTION, EXT_KEY, true)

local editor = reaper.MIDIEditor_GetActive()
if command and editor then
  local cmdId = reaper.NamedCommandLookup(command)
  reaper.MIDIEditor_OnCommand(editor, cmdId)
end

local EXT_SECTION, EXT_KEY = 'reaperwrb', 'script_action'

local action = reaper.GetExtState(EXT_SECTION, EXT_KEY)
reaper.DeleteExtState(EXT_SECTION, EXT_KEY, true)

-- SCRIPT ACTIONS
if action == "nudge_vol_up" then
  reaper.Undo_BeginBlock()
  
  count_sel_tracks = reaper.CountSelectedTracks(0)
  
  if count_sel_tracks > 0 then
    for i = 0, count_sel_tracks - 1 do  
      track = reaper.GetSelectedTrack(0, i)
      vol = reaper.GetMediaTrackInfo_Value(track, "D_VOL")
      vol = 20*math.log(vol,10)
      new_vol = vol + 1
      if(new_vol > 12) then
        new_vol = 12
      end
      new_vol = 10^(new_vol / 20)
      reaper.SetMediaTrackInfo_Value(track, "D_VOL", new_vol)
    end
  end
  
  reaper.Undo_EndBlock("ReaperWRB: Nudge selected tracks vol +1db", -1)
  
elseif action == "nudge_vol_down" then
  reaper.Undo_BeginBlock()
  
  count_sel_tracks = reaper.CountSelectedTracks(0)
  
  if count_sel_tracks > 0 then
    for i = 0, count_sel_tracks - 1 do  
      track = reaper.GetSelectedTrack(0, i)
      vol = reaper.GetMediaTrackInfo_Value(track, "D_VOL")
      vol = 20*math.log(vol,10)
      new_vol = vol - 1
      if(new_vol < -150) then
        new_vol = -150
      end
      new_vol = 10^(new_vol / 20)
      reaper.SetMediaTrackInfo_Value(track, "D_VOL", new_vol)
    end
  end
  
  reaper.Undo_EndBlock("ReaperWRB: Nudge selected tracks vol -1db", -1)
end