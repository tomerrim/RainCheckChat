import argparse


def parse_arguments():
    """
    Parse command-line arguments for the server.

    Returns:
    - args (argparse.Namespace): Parsed command-line arguments.
    """
    try:
        parser = argparse.ArgumentParser()
        parser.add_argument("--port", type=int, default=8000, help="Port number for the server")
        return parser.parse_args()
    except Exception as e:
        print(f"Error parsing arguments: {e}")
        raise