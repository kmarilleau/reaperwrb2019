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

elseif action == "next_region" then

  exec = false
  reaper.Undo_BeginBlock()

  edit_pos = reaper.GetCursorPosition()
  
	play_state = reaper.GetPlayState()
	if play_state > 0 then
		pos = reaper.GetPlayPosition()
	else
		pos = edit_pos
	end
	
	i=0
	repeat
		iRetval, bIsrgnOut, iPosOut, iRgnendOut, sNameOut, iMarkrgnindexnumberOut, iColorOur = reaper.EnumProjectMarkers3(-1, i)
		if iRetval >= 1 then
			if bIsrgnOut == true and iPosOut > pos then
        -- ACTION ON REGIONS HERE
        if play_state > 0 then
          reaper.SetEditCurPos(iPosOut, true, true) -- moveview and seekplay
        else
          reaper.SetEditCurPos(iPosOut, true, false)
        end

        exec = true
				break
			end
			i = i+1
		end
  until iRetval == 0

  if exec == false then
    reaper.GoToRegion(0, 1, true)
    pos = reaper.GetCursorPosition()
    if play_state > 0 then
      reaper.SetEditCurPos(pos, true, true)
    else
      reaper.SetEditCurPos(pos, true, false)
    end
  end
  
  reaper.Undo_EndBlock("ReaperWRB: Next Region", -1)

elseif action == "prev_region" then

  reaper.Undo_BeginBlock()

  exec = false
  reaper.Undo_BeginBlock()

  edit_pos = reaper.GetCursorPosition()
  
	play_state = reaper.GetPlayState()
	if play_state > 0 then
		pos = reaper.GetPlayPosition()
	else
		pos = edit_pos
	end
  
  retval, num_markers, num_regions = reaper.CountProjectMarkers(-1)

  last_id=(num_markers + num_regions) - 1

	i=last_id
	repeat
		iRetval, bIsrgnOut, iPosOut, iRgnendOut, sNameOut, iMarkrgnindexnumberOut, iColorOur = reaper.EnumProjectMarkers3(-1, i)
		if iRetval >= 1 then
			if bIsrgnOut == true and iPosOut < pos then
        -- ACTION ON REGIONS HERE
        if play_state > 0 then
          iRetval, bIsrgnOut, iPosOut, iRgnendOut, sNameOut, iMarkrgnindexnumberOut, iColorOur = reaper.EnumProjectMarkers3(-1, i - 1)
          if iRetval >= 1 then
            reaper.SetEditCurPos(iPosOut, true, true) -- moveview and seekplay
            exec = true
            break
          end
        else
          reaper.SetEditCurPos(iPosOut, true, false)
          exec = true
          break
        end

			end
			i = i-1
		end
  until iRetval == 0

  if exec == false then
    iRetval, bIsrgnOut, iPosOut, iRgnendOut, sNameOut, iMarkrgnindexnumberOut, iColorOur = reaper.EnumProjectMarkers3(-1, last_id)
    if play_state > 0 then
      reaper.SetEditCurPos(iPosOut, true, true)
    else
      reaper.SetEditCurPos(iPosOut, true, false)
    end
  end

  reaper.Undo_EndBlock("ReaperWRB. Previous Region", -1)

end