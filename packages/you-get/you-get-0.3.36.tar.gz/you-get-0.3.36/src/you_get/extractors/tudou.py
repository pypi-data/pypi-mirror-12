#!/usr/bin/env python

__all__ = ['tudou_download', 'tudou_download_playlist', 'tudou_download_by_id', 'tudou_download_by_iid']

from ..common import *
from xml.dom.minidom import parseString

def tudou_download_by_iid(iid, title, output_dir = '.', merge = True, info_only = False):
    data = json.loads(get_decoded_html('http://www.tudou.com/outplay/goto/getItemSegs.action?iid=%s' % iid))
    temp = max([data[i] for i in data if 'size' in data[i][0]], key=lambda x:sum([part['size'] for part in x]))
    vids, size = [t["k"] for t in temp], sum([t["size"] for t in temp])
    urls = [[n.firstChild.nodeValue.strip()
             for n in
                parseString(
                    get_html('http://ct.v2.tudou.com/f?id=%s' % vid))
                .getElementsByTagName('f')][0]
            for vid in vids]

    ext = r1(r'http://[\w.]*/(\w+)/[\w.]*', urls[0])

    print_info(site_info, title, ext, size)
    if not info_only:
        download_urls(urls, title, ext, size, output_dir=output_dir, merge = merge)

def tudou_download_by_id(id, title, output_dir = '.', merge = True, info_only = False):
    html = get_html('http://www.tudou.com/programs/view/%s/' % id)

    iid = r1(r'iid\s*[:=]\s*(\S+)', html)
    title = r1(r'kw\s*[:=]\s*[\'\"]([^\n]+?)\'\s*\n', html).replace("\\'", "\'")
    tudou_download_by_iid(iid, title, output_dir = output_dir, merge = merge, info_only = info_only)

def tudou_download(url, output_dir = '.', merge = True, info_only = False, **kwargs):
    # Embedded player
    id = r1(r'http://www.tudou.com/v/([^/]+)/', url)
    if id:
        return tudou_download_by_id(id, title="", info_only=info_only)

    html = get_decoded_html(url)

    title = r1(r'kw\s*[:=]\s*[\'\"]([^\n]+?)\'\s*\n', html).replace("\\'", "\'")
    assert title
    title = unescape_html(title)

    vcode = r1(r'vcode\s*[:=]\s*\'([^\']+)\'', html)
    if vcode:
        from .youku import youku_download_by_vid
        if 'stream_id' in kwargs:
            return youku_download_by_vid(vcode, title=title, output_dir=output_dir, merge=merge, info_only=info_only, stream_id=kwargs['stream_id'])
        else:
            return youku_download_by_vid(vcode, title=title, output_dir=output_dir, merge=merge, info_only=info_only)

    iid = r1(r'iid\s*[:=]\s*(\d+)', html)
    if not iid:
        return tudou_download_playlist(url, output_dir, merge, info_only)

    tudou_download_by_iid(iid, title, output_dir = output_dir, merge = merge, info_only = info_only)

def parse_playlist(url):
    aid = r1('http://www.tudou.com/playlist/p/a(\d+)(?:i\d+)?\.html', url)
    html = get_decoded_html(url)
    if not aid:
        aid = r1(r"aid\s*[:=]\s*'(\d+)'", html)
    if re.match(r'http://www.tudou.com/albumcover/', url):
        atitle = r1(r"title\s*:\s*'([^']+)'", html)
    elif re.match(r'http://www.tudou.com/playlist/p/', url):
        atitle = r1(r'atitle\s*=\s*"([^"]+)"', html)
    else:
        raise NotImplementedError(url)
    assert aid
    assert atitle
    import json
    #url = 'http://www.tudou.com/playlist/service/getZyAlbumItems.html?aid='+aid
    url = 'http://www.tudou.com/playlist/service/getAlbumItems.html?aid='+aid
    return [(atitle + '-' + x['title'], str(x['itemId'])) for x in json.loads(get_html(url))['message']]

def tudou_download_playlist(url, output_dir = '.', merge = True, info_only = False, **kwargs):
    videos = parse_playlist(url)
    for i, (title, id) in enumerate(videos):
        print('Processing %s of %s videos...' % (i + 1, len(videos)))
        tudou_download_by_iid(id, title, output_dir = output_dir, merge = merge, info_only = info_only)

site_info = "Tudou.com"
download = tudou_download
download_playlist = tudou_download_playlist
