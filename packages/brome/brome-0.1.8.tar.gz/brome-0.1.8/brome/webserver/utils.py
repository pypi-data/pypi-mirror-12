# -*- coding: utf-8 -*-

"""Helper utilities and decorators."""

from subprocess import call
import os.path
import md5

from IPython import embed
from flask import flash

def flash_errors(form, category="warning"):
    """Flash all errors for a form."""
    for field, errors in form.errors.items():
        for error in errors:
            flash("{0} - {1}"
                  .format(getattr(form, field).label.text, error), category)

def annotate_video(blueprint, title, obj_data):
    try:
        m = md5.new()
        m.update(title)
        video_hash = m.hexdigest()

        data = {}
        relative_video_folder = os.sep.join(obj_data['video_path'].split(os.sep)[:-1])
        video_folder = os.path.join(
            blueprint.app.brome.get_config_value('project:test_batch_result_path'),
            os.sep.join(obj_data['video_path'].split(os.sep)[:-1])
        )

        data['title'] = "Bug (@%ss) %s"%(obj_data['video_time_position'], title)
        data['in'] = os.path.join(blueprint.app.brome.get_config_value('project:test_batch_result_path'), obj_data['video_path'])
        data['font_path'] = blueprint.app.brome.get_config_value("webserver:report")['font_path']
        data['copied_video_path'] = os.path.join(video_folder, 'copy-%s.flv'%video_hash)
        data['annotated_video_path'] = os.path.join(video_folder, '%s.flv'%video_hash)
        data['relative_annotated_video_path'] = os.path.join(relative_video_folder, '%s.flv'%video_hash)

        if obj_data['extra_data'].get('bounding_client_rect'):
            bounding_client_rect = obj_data['extra_data'].get('bounding_client_rect')
            data['box_start_time'] = int(obj_data['video_time_position'] - 5)
            data['box_end_time'] = int(obj_data['video_time_position'] + 1)
            data['box_x_position'] = int(bounding_client_rect['right']) + obj_data['extra_data']['video_x_offset']
            data['box_y_position'] = int(bounding_client_rect['bottom']) + obj_data['extra_data']['video_y_offset']
            data['box_h'] = int(bounding_client_rect['height'])
            data['box_w'] = int(bounding_client_rect['width'])

        script = """
            rm {annotated_video_path}
            cp {in} {copied_video_path}
            ffmpeg -i {copied_video_path} -vf "drawtext=':fontfile={font_path}: text='{title}': box=1: boxcolor=white@0.5: fontsize=32: y=(h - 30):, drawbox=enable='between(t,{box_start_time},{box_end_time})': x={box_x_position}: y={box_y_position}: c=red: h={box_h}: w={box_w}:" -acodec copy {annotated_video_path}
            rm {copied_video_path}
        """.format(**data)
        print script

        call(script, shell = True)

        return 'Success!', data['relative_annotated_video_path']
    except Exception as e:
        return unicode(e), None
