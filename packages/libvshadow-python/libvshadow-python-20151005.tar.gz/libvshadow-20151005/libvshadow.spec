Name: libvshadow
Version: 20151005
Release: 1
Summary: Library to access the Windows NT Volume Shadow Snapshot (VSS) format
Group: System Environment/Libraries
License: LGPL
Source: %{name}-%{version}.tar.gz
URL: https://github.com/libyal/libvshadow/
BuildRoot: %{_tmppath}/%{name}-%{version}-%{release}-root-%(%{__id_u} -n)
             
             

%description
libvshadow is a library to access the Windows NT Volume Shadow Snapshot (VSS) format

%package devel
Summary: Header files and libraries for developing applications for libvshadow
Group: Development/Libraries
Requires: libvshadow = %{version}-%{release}

%description devel
Header files and libraries for developing applications for libvshadow.

%package tools
Summary: Several tools for reading Windows NT Volume Shadow Snapshots (VSS)
Group: Applications/System
Requires: libvshadow = %{version}-%{release}  fuse-libs
BuildRequires:  fuse-devel

%description tools
Several tools for reading Windows NT Volume Shadow Snapshots (VSS)

%package python
Summary: Python bindings for libvshadow
Group: System Environment/Libraries
Requires: libvshadow = %{version}-%{release} python
BuildRequires: python-devel

%description python
Python bindings for libvshadow

%prep
%setup -q

%build
%configure --prefix=/usr --libdir=%{_libdir} --mandir=%{_mandir} --enable-python
make %{?_smp_mflags}

%install
rm -rf ${RPM_BUILD_ROOT}
make DESTDIR=${RPM_BUILD_ROOT} install

%clean
rm -rf ${RPM_BUILD_ROOT}

%post -p /sbin/ldconfig

%postun -p /sbin/ldconfig

%files
%defattr(644,root,root,755)
%doc AUTHORS COPYING NEWS README
%attr(755,root,root) %{_libdir}/*.so.*

%files devel
%defattr(644,root,root,755)
%doc AUTHORS COPYING NEWS README ChangeLog
%{_libdir}/*.a
%{_libdir}/*.la
%{_libdir}/*.so
%{_libdir}/pkgconfig/libvshadow.pc
%{_includedir}/*
%{_mandir}/man3/*

%files tools
%defattr(644,root,root,755)
%doc AUTHORS COPYING NEWS README
%attr(755,root,root) %{_bindir}/vshadowinfo
%attr(755,root,root) %{_bindir}/vshadowmount
%{_mandir}/man1/*

%files python
%defattr(644,root,root,755)
%doc AUTHORS COPYING NEWS README
%{_libdir}/python*/site-packages/*.a
%{_libdir}/python*/site-packages/*.la
%{_libdir}/python*/site-packages/*.so

%changelog
* Thu Nov  5 2015 Joachim Metz <joachim.metz@gmail.com> 20151005-1
- Auto-generated

