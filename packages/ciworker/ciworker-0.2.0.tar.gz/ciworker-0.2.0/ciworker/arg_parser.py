import argparse


def get_args():

    parser = argparse.ArgumentParser(description='Start python-worker.')

    # parser.add_argument('endpoint', type=str, help='Endpoint name.')
    # parser.add_argument('id', type=int, help='worker ID.')
    # parser.add_argument('router', type=str, help='router IP address.')
    # parser.add_argument('collector', type=str, help='collector IP address.')
    # parser.add_argument('port', type=int, help='port number of the router.')

    parser.add_argument('config', type=str, help='Configuration file location.')

    return parser.parse_args()
