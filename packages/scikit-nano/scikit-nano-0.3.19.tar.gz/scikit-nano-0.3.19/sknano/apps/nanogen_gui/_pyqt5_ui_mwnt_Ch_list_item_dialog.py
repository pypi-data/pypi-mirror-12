# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'mwnt_Ch_list_item_dialog.ui'
#
# Created by: PyQt5 UI code generator 5.5
#
# WARNING! All changes made in this file will be lost!

from PyQt5 import QtCore, QtGui, QtWidgets

class Ui_MWNTChListItemDialog(object):
    def setupUi(self, MWNTChListItemDialog):
        MWNTChListItemDialog.setObjectName("MWNTChListItemDialog")
        MWNTChListItemDialog.resize(302, 103)
        font = QtGui.QFont()
        font.setFamily("Arial")
        MWNTChListItemDialog.setFont(font)
        self.verticalLayout = QtWidgets.QVBoxLayout(MWNTChListItemDialog)
        self.verticalLayout.setObjectName("verticalLayout")
        self.horizontalLayout_5 = QtWidgets.QHBoxLayout()
        self.horizontalLayout_5.setObjectName("horizontalLayout_5")
        self.horizontalLayout_3 = QtWidgets.QHBoxLayout()
        self.horizontalLayout_3.setObjectName("horizontalLayout_3")
        self.horizontalLayout_2 = QtWidgets.QHBoxLayout()
        self.horizontalLayout_2.setObjectName("horizontalLayout_2")
        self.label_7 = QtWidgets.QLabel(MWNTChListItemDialog)
        font = QtGui.QFont()
        font.setFamily("Arial")
        font.setPointSize(16)
        self.label_7.setFont(font)
        self.label_7.setObjectName("label_7")
        self.horizontalLayout_2.addWidget(self.label_7)
        self.n_spin_box = QtWidgets.QSpinBox(MWNTChListItemDialog)
        self.n_spin_box.setMinimumSize(QtCore.QSize(90, 36))
        font = QtGui.QFont()
        font.setFamily("Arial")
        font.setPointSize(16)
        self.n_spin_box.setFont(font)
        self.n_spin_box.setMaximum(100)
        self.n_spin_box.setProperty("value", 10)
        self.n_spin_box.setObjectName("n_spin_box")
        self.horizontalLayout_2.addWidget(self.n_spin_box)
        self.horizontalLayout_3.addLayout(self.horizontalLayout_2)
        self.horizontalLayout_4 = QtWidgets.QHBoxLayout()
        self.horizontalLayout_4.setObjectName("horizontalLayout_4")
        self.label_14 = QtWidgets.QLabel(MWNTChListItemDialog)
        font = QtGui.QFont()
        font.setFamily("Arial")
        font.setPointSize(16)
        self.label_14.setFont(font)
        self.label_14.setObjectName("label_14")
        self.horizontalLayout_4.addWidget(self.label_14)
        self.m_spin_box = QtWidgets.QSpinBox(MWNTChListItemDialog)
        self.m_spin_box.setMinimumSize(QtCore.QSize(90, 36))
        font = QtGui.QFont()
        font.setFamily("Arial")
        font.setPointSize(16)
        self.m_spin_box.setFont(font)
        self.m_spin_box.setMaximum(100)
        self.m_spin_box.setProperty("value", 10)
        self.m_spin_box.setObjectName("m_spin_box")
        self.horizontalLayout_4.addWidget(self.m_spin_box)
        self.horizontalLayout_3.addLayout(self.horizontalLayout_4)
        self.horizontalLayout_5.addLayout(self.horizontalLayout_3)
        self.verticalLayout.addLayout(self.horizontalLayout_5)
        self.horizontalLayout = QtWidgets.QHBoxLayout()
        self.horizontalLayout.setObjectName("horizontalLayout")
        self.ok_push_button = QtWidgets.QPushButton(MWNTChListItemDialog)
        font = QtGui.QFont()
        font.setFamily("Arial")
        font.setPointSize(12)
        self.ok_push_button.setFont(font)
        self.ok_push_button.setObjectName("ok_push_button")
        self.horizontalLayout.addWidget(self.ok_push_button)
        self.cancel_push_button = QtWidgets.QPushButton(MWNTChListItemDialog)
        font = QtGui.QFont()
        font.setFamily("Arial")
        font.setPointSize(12)
        self.cancel_push_button.setFont(font)
        self.cancel_push_button.setObjectName("cancel_push_button")
        self.horizontalLayout.addWidget(self.cancel_push_button)
        self.verticalLayout.addLayout(self.horizontalLayout)
        spacerItem = QtWidgets.QSpacerItem(20, 2, QtWidgets.QSizePolicy.Minimum, QtWidgets.QSizePolicy.Expanding)
        self.verticalLayout.addItem(spacerItem)

        self.retranslateUi(MWNTChListItemDialog)
        QtCore.QMetaObject.connectSlotsByName(MWNTChListItemDialog)

    def retranslateUi(self, MWNTChListItemDialog):
        _translate = QtCore.QCoreApplication.translate
        MWNTChListItemDialog.setWindowTitle(_translate("MWNTChListItemDialog", "(n, m) Dialog"))
        self.label_7.setText(_translate("MWNTChListItemDialog", "<html><head/><body><p align=\"right\">n = </p></body></html>"))
        self.label_14.setText(_translate("MWNTChListItemDialog", "<html><head/><body><p align=\"right\">m = </p></body></html>"))
        self.ok_push_button.setText(_translate("MWNTChListItemDialog", "OK"))
        self.cancel_push_button.setText(_translate("MWNTChListItemDialog", "Cancel"))

