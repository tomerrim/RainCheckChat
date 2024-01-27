import logging


def setup_logger():
    # Create a logger
    logger = logging.getLogger(__name__)

    # Configure logging
    logging.basicConfig(
        filename="chat.log", level=logging.INFO, format="%(asctime)s - %(message)s"
    )

    return logger


# Call the setup_logger function to get the configured logger
logger = setup_logger()
