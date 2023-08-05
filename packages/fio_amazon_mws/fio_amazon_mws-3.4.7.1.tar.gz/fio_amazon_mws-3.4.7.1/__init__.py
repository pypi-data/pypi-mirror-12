# -*- coding: utf-8 -*-
"""
    __init__

    Initialize module

"""
from trytond.pool import Pool
from channel import (
    SaleChannel, CheckAmazonServiceStatus, CheckAmazonServiceStatusView,
    CheckAmazonSettingsView, CheckAmazonSettings
)
from product import (
    Product, ExportAmazonCatalogStart, ExportAmazonCatalog,
    ExportAmazonCatalogDone, ExportAmazonInventoryStart,
    ExportAmazonInventory, ExportAmazonInventoryDone, ProductCode, Template
)
from sale import Sale
from party import Party, Address
from country import Subdivision


def register():
    """
    Register classes with pool
    """
    Pool.register(
        SaleChannel,
        Product,
        ProductCode,
        Template,
        ExportAmazonCatalogStart,
        ExportAmazonCatalogDone,
        ExportAmazonInventoryStart,
        ExportAmazonInventoryDone,
        CheckAmazonServiceStatusView,
        CheckAmazonSettingsView,
        Sale,
        Party,
        Address,
        Subdivision,
        module='amazon_mws', type_='model'
    )
    Pool.register(
        CheckAmazonServiceStatus,
        CheckAmazonSettings,
        ExportAmazonCatalog,
        ExportAmazonInventory,
        module='amazon_mws', type_='wizard'
    )
