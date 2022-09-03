import FormData from 'form-data';
function preset(data: FormData, value: number) {
  data.append(`xfield_vol_${value}`, '');
  data.append(`xfield_ch_${value}`, '');
  data.append(`xfield_ch_name_${value}`, '');
  data.append(`xfield_manga_${value}`, '');
  data.append(`xfield_manga_${value}`, Buffer.from(''), { filename: '' });
}
export default function empty_form_data(data: FormData) {
  for (let i = 1; i <= 9; i++) preset(data, i);
  data.append('xfield[alt_name]', '');
  data.append('xfield[orig_name]', '');
  data.append('xfield[descimg]', '');
  data.append('xfield_descimg', Buffer.from(''), { filename: '' });
  data.append('xfield[mangaka]', '');
  data.append('mangaka_1', '');
  data.append('com_1', '');
  data.append('xfield[translation]', '');
  data.append('translation_2', '');
  data.append('com_2', '');
  data.append('translation', '');
  data.append('xfield[end]', '0');
  data.append('xfield[trans_end]', '0');
  data.append('xfield[volumes]', '1');
  data.append('xfield[single]', '0');
  data.append('xfield[type]', '0');
  data.append('xfield[series]', '');
  data.append('series', '');
  data.append('tags', '');
  data.append('bbfont', '0');
  data.append('bbsize', '0');
  data.append('short_story', '');
  data.append('add', '');
  data.append('mod', 'addnews');
}
