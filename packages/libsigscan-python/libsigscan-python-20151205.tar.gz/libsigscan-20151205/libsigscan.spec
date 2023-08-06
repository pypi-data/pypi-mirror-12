Name: libsigscan
Version: 20151205
Release: 1
Summary: Library for binary signature scanning
Group: System Environment/Libraries
License: LGPL
Source: %{name}-%{version}.tar.gz
URL: https://github.com/libyal/libsigscan/
BuildRoot: %{_tmppath}/%{name}-%{version}-%{release}-root-%(%{__id_u} -n)
           
           

%description
libsigscan is a library for binary signature scanning

%package devel
Summary: Header files and libraries for developing applications for libsigscan
Group: Development/Libraries
Requires: libsigscan = %{version}-%{release}

%description devel
Header files and libraries for developing applications for libsigscan.

%package tools
Summary: Several tools for binary signature scanning files
Group: Applications/System
Requires: libsigscan = %{version}-%{release} 
 

%description tools
Several tools for binary signature scanning files

%package python
Summary: Python bindings for libsigscan
Group: System Environment/Libraries
Requires: libsigscan = %{version}-%{release} python
BuildRequires: python-devel

%description python
Python bindings for libsigscan

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
%{_libdir}/pkgconfig/libsigscan.pc
%{_includedir}/*
%{_mandir}/man3/*

%files tools
%defattr(644,root,root,755)
%doc AUTHORS COPYING NEWS README
%attr(755,root,root) %{_bindir}/sigscan
%{_mandir}/man1/*
%config %{_sysconfdir}/sigscan.conf

%files python
%defattr(644,root,root,755)
%doc AUTHORS COPYING NEWS README
%{_libdir}/python*/site-packages/*.a
%{_libdir}/python*/site-packages/*.la
%{_libdir}/python*/site-packages/*.so

%changelog
* Sat Dec  5 2015 Joachim Metz <joachim.metz@gmail.com> 20151205-1
- Auto-generated

